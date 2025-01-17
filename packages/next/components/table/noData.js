import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 184px;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  ${(p) =>
    p.isCollapse &&
    css`
      height: 216px !important;
    `}
`;

export default function NoData({ isCollapse }) {
  return (
    <Wrapper isCollapse={isCollapse}>
      <div>
        <img src="/imgs/icons/nodata.svg" alt="No data" />
      </div>
      <p>No data</p>
    </Wrapper>
  );
}
