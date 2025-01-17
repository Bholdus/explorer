import { useEffect, useState, Fragment, useMemo } from "react";
import styled, { css } from "styled-components";

import { useWindowSize } from "utils/hooks";
import NoData from "./noData";
import TimeHead from "./timeHead";
import TimeBody from "./timeBody";
import { useDispatch, useSelector } from "react-redux";
import { timeTypeSelector, setTimeType } from "store/reducers/preferenceSlice";
import {
  p_18_bold,
  p_20_normal,
  text_dark_major,
} from "../../styles/textStyles";
import JsonDisplay from "components/jsonDisplay";
import { card_border } from "styles/textStyles";

const Wrapper = styled.div``;

const Title = styled.h4`
  ${p_20_normal};
  color: #fff;
  margin: 0 0 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  background: #1c2c44;
  border-radius: 12px;
  border-spacing: 0px;

  thead {
    background: #113162;
    overflow: hidden;
    th {
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  th {
    :first-child {
      border-top-left-radius: 12px;
      -moz-border-top-left-radius: 12px;
      -webkit-border-top-left-radius: 12px;
    }

    :last-child {
      border-top-right-radius: 12px;
      -moz-border-top-right-radius: 12px;
      -webkit-border-top-right-radius: 12px;
    }

    padding: 16px 24px;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
    position: relative;
  }

  tbody {
    ::before,
    ::after {
      content: "";
      display: block;
      height: 4px;
    }

    td {
      padding: 0px 24px;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }

  tfoot {
    td {
      /* border-top: 1px solid #808191; */
      padding: 14px 24px;
      font-size: 14px;
      line-height: 20px;
      color: #ffffff;
    }
  }
`;

const StyledTr = styled.tr`
  ${(p) =>
    !p.isShow &&
    css`
      /* :not(:last-child) { */
      td {
        position: relative;
        .border-bottom {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: #808191;
        }
        :first-child {
          .border-bottom {
            left: 24px;
          }
        }
        :last-child {
          .border-bottom {
            right: 24px;
          }
        }
      }
      /* } */
    `}
`;

const TableDataWrapper = styled.td`
  padding: 8px 24px 8px !important;
`;

const CollapseTableDataWrapper = styled.div`
  padding: 8px 24px !important;
`;

const TableDataItem = styled.pre`
  background: #fafafa;
  border-radius: 4px;
  border: 32px solid #fafafa;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-family: "SF Mono";
  letter-spacing: -0.5px;

  @media screen and (max-width: 1200px) {
    max-width: calc(100vw - var(--scrollbar-width) - 48px - 48px);
  }
  max-width: calc(1200px - 48px);

  overflow-x: auto;
`;

const CollapseTableDataItem = styled.pre`
  background: #fafafa;
  border-radius: 4px;
  padding: 32px;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-family: "SF Mono";
  letter-spacing: -0.5px;

  overflow-x: auto;
  :-webkit-scrollbar {
    display: none;
  }
`;

const CollapseWrapper = styled.div`
  background: #1c2c44;
  ${card_border};
`;

const CollapseTableWrapper = styled.div`
  padding: 16px 0px;
  width: 100%;

  /* :not(:last-child) { */
  position: relative;
  .border-bottom {
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 0;
    height: 1px;
    background-color: #808191;
  }
  /* } */
`;

const CollapseTable = styled.table`
  width: 100%;
`;

const CollapseHead = styled.td`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 24px;
  width: 136px;
`;

const CollapseBody = styled.td`
  font-size: 14px;
  line-height: 20px;
  padding: 6px 24px;
  word-break: break-all;
`;

const CollapseFoot = styled.div`
  padding: 16px 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DataImg = styled.img`
  cursor: pointer;
`;

export default function Table({
  title,
  head,
  body,
  foot,
  rowHeight = 49,
  collapse,
  expand,
  type,
}) {
  const dispatch = useDispatch();
  const [isCollapse, setIsCollapse] = useState();

  // Hanlding expand json data by default
  const initExpand = useMemo(() => [], []);
  if (expand >= 0) {
    initExpand[expand] = true;
  }
  const [showData, setShowData] = useState(initExpand);

  useEffect(() => {
    if (!initExpand.some((item) => item)) {
      setShowData((body || []).map(() => false));
    }
  }, [body, initExpand]);

  const timeType = useSelector(timeTypeSelector);
  useEffect(() => {
    const timeType = localStorage.getItem("timeType");
    if (timeType) {
      dispatch(setTimeType(timeType));
    }
  }, [dispatch]);
  const doSetTimeType = (timeType) => {
    dispatch(setTimeType(timeType));
  };
  const size = useWindowSize();

  useEffect(() => {
    if (!size.width) return;
    if (collapse && collapse > size.width) {
      setIsCollapse(true);
    } else {
      setIsCollapse(false);
    }
  }, [size, collapse]);

  if (!size.width || isCollapse === undefined) {
    return null;
  }

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {!isCollapse && (
        <StyledTable>
          <thead>
            <tr>
              {(head || []).map((item, index) => (
                <th
                  key={index}
                  style={{
                    textAlign: item.align ?? "left",
                    width: item.width ?? "100%",
                  }}
                >
                  {item.type === "time" && (
                    <TimeHead timeType={timeType} setTimeType={doSetTimeType} />
                  )}
                  {item.type === "data" && <div />}
                  {!item.type && item.name}
                </th>
              ))}
            </tr>
          </thead>
          {body && body.length > 0 ? (
            <>
              <tbody>
                {(body || []).map((row, bodyIndex) => (
                  <Fragment key={bodyIndex}>
                    <StyledTr isShow={showData[bodyIndex]}>
                      {row.map((item, index) => (
                        <td
                          key={index}
                          style={{
                            textAlign: head?.[index]?.align ?? "left",
                            height: `${rowHeight}px`,
                          }}
                        >
                          {head?.[index]?.type === "time" && (
                            <TimeBody timeType={timeType} ts={item} />
                          )}
                          {head?.[index]?.type === "data" && (
                            <IconWrapper>
                              <DataImg
                                src={`/imgs/icons/data-show${
                                  showData[bodyIndex] ? "-active" : ""
                                }.svg`}
                                alt="action"
                                onClick={() => {
                                  const data = [...showData];
                                  data[bodyIndex] = !showData[bodyIndex];
                                  setShowData(data);
                                }}
                              />
                            </IconWrapper>
                          )}
                          {!head?.[index]?.type && item}
                          <div className="border-bottom"></div>
                        </td>
                      ))}
                    </StyledTr>
                    {showData[bodyIndex] && (
                      <StyledTr>
                        <TableDataWrapper colSpan="100%">
                          <JsonDisplay
                            data={
                              body?.[bodyIndex]?.[body[bodyIndex].length - 1]
                            }
                            type={type}
                          />
                        </TableDataWrapper>
                      </StyledTr>
                    )}
                  </Fragment>
                ))}
              </tbody>
              {foot && (
                <tfoot>
                  <tr>
                    <td
                      colSpan="100%"
                      style={{ paddingTop: 14, paddingBottom: 14 }}
                    >
                      {foot}
                    </td>
                  </tr>
                </tfoot>
              )}
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan="100%" style={{ padding: 0 }}>
                  <NoData isCollapse={isCollapse} />
                </td>
              </tr>
            </tbody>
          )}
        </StyledTable>
      )}
      {isCollapse && (
        <CollapseWrapper>
          {body && body.length > 0 ? (
            <>
              <div>
                {(body || []).map((bodyItem, bodyIndex) => (
                  <CollapseTableWrapper key={bodyIndex}>
                    <CollapseTable>
                      <tbody>
                        {head.map((headItem, index) => (
                          <tr key={index}>
                            {head?.[index].type === "data" && (
                              <>
                                <CollapseHead></CollapseHead>
                                <CollapseBody>
                                  <IconWrapper>
                                    <DataImg
                                      src={`/imgs/icons/data-show${
                                        showData[bodyIndex] ? "-active" : ""
                                      }.svg`}
                                      alt="action"
                                      onClick={() => {
                                        const data = [...showData];
                                        data[bodyIndex] = !showData[bodyIndex];
                                        setShowData(data);
                                      }}
                                    />
                                  </IconWrapper>
                                </CollapseBody>
                              </>
                            )}
                            {!head?.[index].type && (
                              <>
                                <CollapseHead>{headItem.name}</CollapseHead>
                                <CollapseBody>{bodyItem[index]}</CollapseBody>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </CollapseTable>
                    {showData[bodyIndex] && (
                      <CollapseTableDataWrapper>
                        <JsonDisplay
                          data={body?.[bodyIndex]?.[body[bodyIndex].length - 1]}
                          type={type}
                        />
                      </CollapseTableDataWrapper>
                    )}
                    <div className="border-bottom"></div>
                  </CollapseTableWrapper>
                ))}
              </div>
              {foot && <CollapseFoot>{foot}</CollapseFoot>}
            </>
          ) : (
            <NoData isCollapse={isCollapse} />
          )}
        </CollapseWrapper>
      )}
    </Wrapper>
  );
}
