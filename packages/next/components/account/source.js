import PolkascanGrey from "../../public/imgs/icons/identity/polkascan-grey.svg";
import Polkascan from "../../public/imgs/icons/identity/polkascan.svg";
import SubscanGrey from "../../public/imgs/icons/identity/subscan-grey.svg";
import Subscan from "../../public/imgs/icons/identity/subscan.svg";
import styled from "styled-components";


const Wrapper = styled.div`
  width: 100%;
  margin-top: 8px;

  svg {
    margin-right: 8px;
  }

  a {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
`

const Source = styled.a`
  svg {
    margin: 0 !important;
  }
  .hover-show {
    display: none;
  }
  &:hover {
    .hover-hide {
      display: none;
    }
    .hover-show {
      display: initial;
    }
  }
`;


export default function Sources({address, relayChain}) {
  return <Wrapper>
    <Source
      href={`https://polkascan.io/${relayChain}/account/${address}`}
      target="_blank"
      title="polkascan"
      style={{margin:0}}
    >
      <PolkascanGrey className="hover-hide"/>
      <Polkascan className="hover-show"/>
    </Source>
    <Source
      href={`https://${relayChain}.subscan.io/account/${address}`}
      target="_blank"
      title="subascan"
    >
      <SubscanGrey className="hover-hide"/>
      <Subscan className="hover-show"/>
    </Source>
  </Wrapper>
}
