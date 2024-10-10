import React, { useReducer } from 'react';

import styled from '@emotion/styled';

// Type definition
export enum SegmentedViewReducerActionType {
  CLICK_SEGMENT = 'segment-clicked',
}

export interface ISegmentedViewReducerActionType {
  type: SegmentedViewReducerActionType;
  payload: any;
}

interface IsegmentedViewControllerTitle {
  title: string;
}

type State = { index: number };

interface ISegmentedViewData {
  children: React.ReactNode[] | React.ReactNode | any;
  state?: State;
  handleStateChange?: (...args: any) => void;
}

interface ISegmentedViewController extends ISegmentedViewData {
  segmentedViewControllerTitle: IsegmentedViewControllerTitle[];
}

// Reducer

function segmentedViewReducer(
  state: any,
  action: ISegmentedViewReducerActionType
) {
  switch (action.type) {
    case SegmentedViewReducerActionType.CLICK_SEGMENT:
      return { ...action.payload };
    default:
      return state;
  }
}

// Components

export const SegmentedView: React.FC<Pick<ISegmentedViewData, 'children'>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(segmentedViewReducer, { index: 0 });

  const handleStateChange = (index: any) =>
    dispatch({
      type: SegmentedViewReducerActionType.CLICK_SEGMENT,
      payload: { index },
    });

  return (
    <SegmentedViewContainer>
      {React.Children.map(children, (child: any) => {
        if (child.type === SegmentedViewController) {
          return React.cloneElement(child, {
            ...child.props,
            state,
            handleStateChange,
          });
        } else if (child.type === SegmentedViewData) {
          return React.cloneElement(child, { ...child.props, state });
        }
      })}
    </SegmentedViewContainer>
  );
};

export const SegmentedViewController: React.FC<
  Omit<ISegmentedViewController, 'children'>
> = ({ segmentedViewControllerTitle, state, handleStateChange }) => {
  return (
    <SegmentedViewControllerWrapper>
      {segmentedViewControllerTitle.map((data, index) => (
        <div
          className={state?.index === index ? 'activeSegment' : ''}
          onClick={() => handleStateChange!(index)}
          key={index}
        >
          {data.title}
        </div>
      ))}
    </SegmentedViewControllerWrapper>
  );
};

export const SegmentedViewData: React.FC<
  Omit<ISegmentedViewData, 'handleStateChange'>
> = ({ children, state }) => {
  return (
    <SegmentData>
      {React.Children.map(children, (child: any, index) => {
        const computedClass = state?.index === index ? 'showSegment' : '';
        return React.cloneElement(child, {
          ...child.props,
          className: computedClass,
        });
      })}
    </SegmentData>
  );
};

// Styles

const SegmentData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    display: none;
    width: 100%;
    height: calc(100vh - 128px);
    overflow: hidden;
  }

  & > .showSegment {
    display: flex;
  }
`;

const SegmentedViewControllerWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 32px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};

  & > * {
    text-align: left;
    padding: 12px 0px;
    padding-left: 0;
    line-height: 22px;
    font-size: 22px;
    font-weight: 600;
    color: black;
    cursor: pointer;
    width: fit-content;
  }

  & > *:hover {
  }

  & > .activeSegment {
    color: rebeccapurple;
    border-bottom: 2px solid rebeccapurple;
  }
`;

const SegmentedViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 3rem;
  }
`;
