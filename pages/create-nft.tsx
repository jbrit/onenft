import { Input, TextArea } from "$components/App/Input/Input.styles";
import { Select } from "$components/App/Select/Select.styles";
import {
  HeadingFive,
  HeadingSix,
  HeadingTwo,
} from "$components/App/Typography/Typography.styles";
import {
  CreateItemButton,
  CreateLayout,
} from "$components/Create/CreateLayout/CreateLayout.styles";
import ImageUpload from "$components/Create/ImageUpload/ImageUpload";
import useAuthenticate from "$hooks/useAuthenticate";
import MainLayout from "$layouts/MainLayout/MainLayout";
import { getProfile } from "$utils/api";
import { accessTokenKey } from "$utils/data";
import toast from "$utils/toast";
import { Col, Form, Row } from "antd";
import { nftContract } from "contract-factory";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { NFTStorage, File } from "nft.storage";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAccount, useProvider, useSigner } from "wagmi";

const CreateNFT: NextPage = () => {
  const [imageFile, setImageFile] = useState<File | null | string>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { data: getProfileData, isLoading: isLoadingGetProfile } = useQuery(
    ["userProfile"],
    () => getProfile()
  );
  const [collectionsSelect, setCollectionsSelect] =
    useState<string>("Select Collection");

  const { data: signer } = useSigner();
  const defaultProvider = useProvider();
  const provider = signer ?? defaultProvider;
  const { isDisconnected, address } = useAccount();
  const router = useRouter();

  const gateway = "https://nftstorage.link/ipfs/";

  const keyA =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDZhRTM3QTEwMmMyMGZlNkRERjE5MTEwZkJlODczYTQ5NTh";
  const keyB =
    "jM0M2Y0UiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NjMwNDcxMTA1MywibmFtZSI6Im9uZW5mdCJ9.pTlZT05HJrIZWyuVlQJc1Vh0y6F_-P24HAZRYgMsCE0";

  async function storeAsset({
    image,
    name,
    description,
  }: {
    image: File;
    name: string;
    description: string;
  }) {
    if (isDisconnected) return;
    // setImageUrl(null);
    try {
      setUploading(true);
      const client = new NFTStorage({ token: keyA + keyB });
      const metadata = await client.store({
        // replace name and description with your own
        name,
        description,
        image,
      });
      console.log(collectionsSelect);
      // setImageUrl(metadata.data.image.href.replace("ipfs://", gateway));
      const tx = await nftContract(collectionsSelect, provider).mint(
        // address can't be null if connected
        address!,
        metadata.url
      );
      // wait for the transaction to be confirmed twice
      const s = await tx.wait(2);
      console.log(tx, s);
      toast("success", "Created NFT successfully");
      form.resetFields();
      // redirect to collection page
      router.push("/my-collections");
      console.log(
        "Metadata stored on Filecoin and IPFS with URL:",
        encodeURI(metadata.data.image.href.replace("ipfs://", gateway))
      );
    } catch (error) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  }
  const [form] = Form.useForm();

  useAuthenticate();

  return (
    <div>
      <Head>
        <title>ONENFT</title>
        <meta name="description" content="An NFT MArketplace and Explorer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <CreateLayout>
          <Form
            form={form}
            name="create-nft"
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
            onFinish={({
              description,
              name,
            }: {
              name: string;
              description: string;
            }) => {
              typeof imageFile !== "string" &&
                imageFile &&
                storeAsset({ image: imageFile, name, description });
            }}
          >
            <HeadingTwo mb="53px">Create new Item</HeadingTwo>
            <Row gutter={{ xs: 24, lg: 32 }}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <HeadingFive mb="24px">
                  Image, Video, Audio or 3D Model
                </HeadingFive>
                <HeadingSix
                  mb="32px"
                  weight="300"
                  color="rgba(255, 255, 255, 0.47)"
                >
                  File types supported: JPG, PNG, GIF, MP4, WEBM. Max size:
                  100MB
                </HeadingSix>
                <ImageUpload
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  mb="32px"
                />
                <HeadingFive mb="24px">Add to collection</HeadingFive>
                <HeadingSix
                  mb="32px"
                  weight="300"
                  color="rgba(255, 255, 255, 0.47)"
                >
                  This is the collection where your item will appear{" "}
                </HeadingSix>
                <Form.Item
                  name="collection"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Select
                    value={collectionsSelect}
                    onChange={(e) => setCollectionsSelect(e as string)}
                    options={
                      getProfileData?.collections?.map(({ address, name }) => ({
                        value: address,
                        label: name,
                      })) ?? []
                    }
                    height="50px"
                    placeholder="Select Collection"
                    mb="32px"
                  />
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <HeadingFive mb="24px">Item Name</HeadingFive>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input
                    placeholder="Type item name"
                    width="100%"
                    border="1.5px solid #3D405C"
                    bgColor="transparent"
                    mb="32px"
                  />
                </Form.Item>
                <HeadingFive mb="24px">Item Description</HeadingFive>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <TextArea
                    placeholder="Provide a detailed description for your item"
                    width="100%"
                    border="1.5px solid #3D405C"
                    maxLength={300}
                    mb="32px"
                  />
                </Form.Item>
              </Col>
            </Row>
            <CreateItemButton
              htmlType="submit"
              loading={uploading}
              height="60px"
            >
              Create Item
            </CreateItemButton>
          </Form>
        </CreateLayout>
      </MainLayout>
    </div>
  );
};

export default CreateNFT;
