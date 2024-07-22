// src/components/ProductComments/ProductComments.styles.ts
import styled from 'styled-components';
import { Button,Input } from 'antd';

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const CommentsButton = styled(Button)`
  background-color: #389c9c;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const CommentsCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #727377;
  margin-left: 10px;
`;

export const CommentModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const CommentInput = styled(Input)`
  width: 80%;
  margin-top: 10px;
`;

export const SubmitButton = styled(Button)`
  background-color: #239271;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

export const CommentsList = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;

export const CommentUser = styled.strong`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

export const CommentText = styled.p`
  margin: 0;
  color: #555;
`;
