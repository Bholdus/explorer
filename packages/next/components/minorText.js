import styled from "styled-components";
import { useSelector } from "react-redux";

import { themeSelector } from "store/reducers/themeSlice";

const Wrapper = styled.div`
  color: rgba(17, 17, 17, 0.65);
  margin: 0;

  a {
    text-decoration: none;
    color: ${(p) => p.themecolor};

    &:hover {
      color: ${(p) => p.themecolor};
    }
  }
`;

export default function MinorText({ children }) {
  const theme = useSelector(themeSelector);

  return <Wrapper themecolor={theme.color}>{children}</Wrapper>;
}
