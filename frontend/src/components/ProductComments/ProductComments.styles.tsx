import styled from 'styled-components';
import { Modal, Input, Button } from 'antd';

export const CommentsButton = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
`;

export const CommentsCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #727377;
`;

export const CommentModal = styled(Modal)``;

export const CommentInput = styled(Input)``;

export const SendButton = styled(Button)`
  margin-top: 10px;
`;

export const CommentList = styled.div`
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  margin-bottom: 10px;
`;

export const CommentUser = styled.strong``;

export const CommentText = styled.p``;
