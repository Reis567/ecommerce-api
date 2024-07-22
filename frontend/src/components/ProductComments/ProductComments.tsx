// src/components/ProductComments/ProductComments.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import {
  CommentsContainer,
  CommentsButton,
  CommentsCount,
  CommentModal,
  CommentInput,
  SubmitButton,
  CommentsList,
  CommentItem,
  CommentUser,
  CommentText,
} from './ProductComments.styles';

interface Comment {
  user: string;
  text: string;
}

interface ProductCommentsProps {
  productId: string;
}

const ProductComments: React.FC<ProductCommentsProps> = ({ productId }) => {
  const { userId, username } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  const baseUrl = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/products/${productId}/comments/`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data.map((comment: any) => ({ user: comment.user.username, text: comment.comment })));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [productId]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`${baseUrl}/api/v1/products/${productId}/comments/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({
            product: productId,
            user: userId,
            comment: newComment.trim()
          })
        });
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        const data = await response.json();
        setComments([...comments, { user: username, text: data.comment }]);
        setNewComment('');
        handleCloseModal();
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  return (
    <CommentsContainer>
      <CommentsButton onClick={handleOpenModal}>Comentários</CommentsButton>
      <CommentsCount>{comments.length} Comentários</CommentsCount>

      <Modal
        title="Comentários"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CommentModal>
          <CommentInput
            placeholder="Escreva seu comentário"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <SubmitButton type="primary" onClick={handleAddComment}>
            Enviar
          </SubmitButton>
        </CommentModal>
        <CommentsList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <CommentUser>{comment.user}:</CommentUser>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentsList>
      </Modal>
    </CommentsContainer>
  );
};

export default ProductComments;
