import styled, { css } from "styled-components";

import Symbol from "components/symbol";
import { card_border } from "styles/textStyles";

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 40px;
  max-height: 292px;
  background: #1c2c44;
  ${card_border};
  z-index: 99;
  overflow-y: auto;
`;

const Title = styled.div`
  padding: 8px 16px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

const BlockItem = styled.div`
  min-height: 48px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0f0fe1;
  cursor: pointer;
  :hover {
    background-color: #1c2c44;
  }
  ${(p) =>
    p.selected &&
    css`
      background-color: #1c2c44;
    `}
`;

const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const AssetItem = styled.div`
  min-height: 48px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  background-color: #1c2c43;
  cursor: pointer;
  :hover {
    background-color: #1c2c44;
  }
  ${(p) =>
    p.selected &&
    css`
      background-color: #1c2c44;
    `}
`;

const AssetWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  flex-basis: 112px;
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const AssetName = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const IndexWrapper = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.65);
  margin-left: auto;
`;

export default function SearchHints({ hints, focus, selected, toPage }) {
  const iconMap = new Map([["osn", "osn"]]);
  if (!focus) return null;
  if (!hints || (hints.assets?.length === 0 && hints.blocks?.length === 0))
    return null;

  return (
    <Wrapper>
      {hints.blocks?.length > 0 && (
        <>
          <Title>BLOCKS</Title>
          {hints.blocks.map((item, index) => (
            <BlockItem
              selected={selected === index}
              key={index}
              onClick={() => toPage(index)}
            >
              <BlockWrapper>
                <img src="/imgs/icons/latest-blocks.svg" alt="" />
                <div>Block</div>
              </BlockWrapper>
              <IndexWrapper>{`#${item.header?.number}`}</IndexWrapper>
            </BlockItem>
          ))}
        </>
      )}
      {hints.assets?.length > 0 && (
        <>
          <Title>ASSETS</Title>
          {hints.assets.map((item, index) => (
            <AssetItem
              key={index}
              selected={selected === (hints?.blocks?.length ?? 0) + index}
              onClick={() => toPage((hints?.blocks?.length ?? 0) + index)}
            >
              <AssetWrapper>
                <Symbol assetId={item.assetId} />
                <div>{item.symbol}</div>
              </AssetWrapper>
              <AssetName>{item.name}</AssetName>
              <IndexWrapper>{`#${item.assetId}`}</IndexWrapper>
            </AssetItem>
          ))}
        </>
      )}
    </Wrapper>
  );
}
