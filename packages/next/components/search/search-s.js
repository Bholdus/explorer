import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useHomePage } from "utils/hooks";
import { addToast } from "../../store/reducers/toastSlice";
import { useDispatch } from "react-redux";
import InLink from "components/inLink";
import nextApi from "services/nextApi";

const ExploreWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 16px;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ExploreHintsWrapper = styled.div`
  z-index: 9999999;
  background-color: #ffffff;
  margin-left: 0 !important;
  padding-top: 8px;
  padding-bottom: 8px;
  top: 53px;
  left: 0;
  width: 320px;
  max-height: 308px;
  position: absolute;
  border-radius: 8px;
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.04),
    0px 1.80882px 5.94747px rgba(0, 0, 0, 0.0260636),
    0px 0.751293px 0.932578px rgba(0, 0, 0, 0.02),
    0px 0.271728px 0px rgba(0, 0, 0, 0.0139364);
  border: 1px solid #ffffff;
`;
const Input = styled.input`
  padding-left: 44px;
  width: 320px;
  font-size: 15px;
  line-height: 36px;
  border: none;
  color: #111111;
  background: url("/imgs/icons/search-idle.svg") no-repeat scroll 7px 7px;

  ::placeholder {
    color: rgba(17, 17, 17, 0.35);
  }

  :focus,
  :focus-visible {
    outline: none;
    background: url("/imgs/icons/search-focus.svg") no-repeat scroll 7px 7px;
  }
`;

const ExploreHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  padding: 0 16px 0 16px;
  cursor: pointer;
  line-height: 48px;
  background-color: #ffffff;
  font-size: 15px;

  svg,
  img {
    margin-right: 8px;
  }

  * {
    margin: 0;
  }

  :hover {
    background-color: #fafafa;
  }
`;

const Token = styled.span`
  margin-right: 8px;
  overflow: hidden;
  width: 92px;
  font-weight: 500;
  color: #111111;
`;

const TokenDesc = styled.span`
  width: 299px;
  margin-right: 8px;
  overflow: hidden;
  color: rgba(17, 17, 17, 0.35);
`;

const Height = styled.span`
  color: rgba(17, 17, 17, 0.65);
`;

export default function SearchS() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isHomePage = useHomePage();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [assets, setHintAssets] = useState([]);
  const [focus, setFocus] = useState(false);
  const iconMap = new Map([["osn", "osn"]]);

  useEffect(() => {
    setSearchKeyword("");
    setHintAssets([]);
  }, [router]);

  const onInput = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    //todo debounce this
    nextApi
      .fetch(`westmint/search/autocomplete?prefix=${value}`)
      .then((res) => {
        setHintAssets(res.result?.assets || []);
      });
  };

  const onKeyDown = (e) => {
    if (e.code === "Enter") {
      return onSearch();
    }
  };

  const onSearch = () => {
    nextApi.fetch(`westmint/search?q=${searchKeyword}`).then((res) => {
      const { asset, extrinsic, block, address } = res.result || {};
      if (asset) {
        const { blockHeight } = asset.createdAt;
        return router.push(`/westmint/asset/${asset.assetId}_${blockHeight}`);
      }
      if (extrinsic) {
        const { blockHeight, index } = extrinsic.indexer;
        return router.push(`/westmint/extrinsic/${blockHeight}-${index}`);
      }
      if (block) {
        const height = block.header?.number;
        return height && router.push(`/westmint/block/${height}`);
      }
      if (address) {
        return router.push(`/westmint/address/${address.address}`);
      }
      dispatch(addToast({ type: "error", message: "No result found" }));
    });
  };

  if (isHomePage) return null;

  return (
    <ExploreWrapper>
      <Input
        value={searchKeyword}
        onChange={onInput}
        placeholder="Address / Transaction / Asset..."
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 100)}
        onKeyDown={onKeyDown}
      />
      {focus && assets.length > 0 && (
        <ExploreHintsWrapper>
          {assets.map((hint, index) => {
            const icon = iconMap.get(hint.symbol.toLowerCase()) ?? "unknown";
            return (
              <InLink
                key={index}
                to={`/westmint/asset/${hint.assetId}_${hint.createdAt?.blockHeight}`}
              >
                <ExploreHint>
                  <img src={`/imgs/token-icons/${icon}.svg`} alt="" />
                  <Token>{hint.symbol}</Token>
                  <TokenDesc>{hint.name}</TokenDesc>
                  <Height>#{hint.createdAt.blockHeight}</Height>
                </ExploreHint>
              </InLink>
            );
          })}
        </ExploreHintsWrapper>
      )}
    </ExploreWrapper>
  );
}