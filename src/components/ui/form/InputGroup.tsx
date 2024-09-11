import styled from "styled-components";
import { StyledInput } from "./style";
import { Select } from "ui/form/Select";
import { ToggleButtonGroupWrapper } from "ui/form/ToggleButtonGroup";
import { StyledButton } from "ui/buttons/style";

export const InputGroup = styled.div`
  display: flex;
  width: 100%;

  &
    > div:not(:first-child)
    ${StyledInput},
    &
    > ${StyledInput}:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > ${ToggleButtonGroupWrapper}:not(:first-child),
  & > ${ToggleButtonGroupWrapper}:not(:first-child) > :first-child > label {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > div:not(:first-child) ${Select} .CustomSelect__control,
  & > ${Select}:not(:first-child) .CustomSelect__control {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > div:not(:first-child) .MentionsInput__control textarea {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  & > div:not(:last-child) ${StyledInput}, & > ${StyledInput}:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > ${ToggleButtonGroupWrapper}:not(:last-child),
  & > ${ToggleButtonGroupWrapper}:not(:last-child) > :last-child > label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > div:not(:last-child) ${Select} .CustomSelect__control,
  & > ${Select}:not(:last-child) .CustomSelect__control {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  & > div:not(:last-child) .MentionsInput__control textarea {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const InputGroupPrepend = styled.div`
  ${StyledButton} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    height: 28px;
  }
`;

export const InputGroupAppend = styled.div`
  ${StyledButton} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
    height: 28px;
  }
`;
