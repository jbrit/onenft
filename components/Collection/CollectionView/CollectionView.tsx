import {
  HeadingThree,
  HeadingTwo,
} from "$components/App/Typography/Typography.styles";
import { FlexibleDiv } from "$components/Box/Box.styles";
import { Discord } from "$svgs/discord";
import { Harmony } from "$svgs/harmony";
import { Telegram } from "$svgs/telegram";
import { Twitter } from "$svgs/twitter";
import { Verified } from "$svgs/verified";
import { Website } from "$svgs/website";
import { getCollection } from "$utils/api";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useQuery } from "react-query";
import {
  CollectionPrices,
  CollectionViewContainer,
  CollectionViewContent,
  CollectionViewImage,
  CollectionViewText,
} from "./CollectionView.styles";
import { ICollectionviewProps } from "./CollectionView.types";

const CollectionView: FC<ICollectionviewProps> = ({ id, name }) => {
  const { data, isLoading, isSuccess } = useQuery(["collection", id], () =>
    getCollection({ address: id })
  );

  return (
    <CollectionViewContainer>
      <CollectionViewImage>
        <Image
          src={data?.image ?? "/default-avartar.png"}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </CollectionViewImage>
      <CollectionViewContent
        flexDir="column"
        gap="18px"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <FlexibleDiv
          alignItems="center"
          gap="10px  "
          justifyContent="flex-start"
        >
          <HeadingTwo>{name ? name : data?.name ?? ""}</HeadingTwo>
          <Verified />
        </FlexibleDiv>
        <FlexibleDiv gap="12px" justifyContent="flex-start">
          {data?.discord ? (
            <Link href={data.discord}>
              <a target="_blank" className="socials-svg">
                <Discord />
              </a>
            </Link>
          ) : null}
          {data?.twitter ? (
            <Link href={data.twitter}>
              <a target="_blank" className="socials-svg">
                <Twitter />
              </a>
            </Link>
          ) : null}
          {data?.telegram ? (
            <Link href={data.telegram}>
              <a target="_blank" className="socials-svg">
                <Telegram />
              </a>
            </Link>
          ) : null}
          {data?.website ? (
            <Link href={data.website}>
              <a target="_blank" className="socials-svg">
                <Website />
              </a>
            </Link>
          ) : null}
        </FlexibleDiv>
        <CollectionViewText>
          Royality Fee <span>{data?.royalty ?? ""}%</span>
        </CollectionViewText>
        <CollectionViewText>{data?.description ?? ""}</CollectionViewText>
        <CollectionPrices flexWrap="wrap" justifyContent="flex-start">
          <FlexibleDiv
            gap="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
          >
            <CollectionViewText>Total volume</CollectionViewText>
            <FlexibleDiv alignItems="center">
              <Harmony className="harmony-svg" />
              <HeadingThree>1000</HeadingThree>
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv
            gap="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
          >
            <CollectionViewText>Floor price</CollectionViewText>
            <FlexibleDiv alignItems="center">
              <Harmony className="harmony-svg" />
              <HeadingThree>20</HeadingThree>
            </FlexibleDiv>
          </FlexibleDiv>
          <FlexibleDiv
            gap="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
          >
            <CollectionViewText>Owners</CollectionViewText>
            <HeadingThree>1256</HeadingThree>
          </FlexibleDiv>
          <FlexibleDiv
            gap="5px"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
          >
            <CollectionViewText>Listed</CollectionViewText>
            <HeadingThree>10%</HeadingThree>
          </FlexibleDiv>
        </CollectionPrices>
      </CollectionViewContent>
    </CollectionViewContainer>
  );
};

export default CollectionView;
