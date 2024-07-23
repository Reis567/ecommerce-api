import React, { useState, useEffect } from 'react';
import { Modal, Input, Button as AntButton } from 'antd';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  CommentsButton,
  CommentsCount,
  CommentModal,
  CommentInput,
  SendButton,
  CommentList,
  CommentItem,
  CommentUser,
  CommentText
} from './ProductComments.styles';

const ProductComments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userId, username } = useAuth();
  const [comments, setComments] = useState<{ user: string, text: string }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const baseUrl = 'http://127.0.0.1:8000'; // URL base do backend

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/products/${id}/comments/`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        console.log('Fetched comments:', data);
    
        if (data.results && Array.isArray(data.results)) {
          setComments(data.results.map((comment: any) => ({
            user: comment.user.username,
            text: comment.comment
          })));
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    

    fetchComments();
  }, [id]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await fetch(`${baseUrl}/api/v1/products/${id}/comments/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({
            product: id,
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
    <div>
      <CommentsButton onClick={handleOpenModal}>Comentários</CommentsButton>
      <CommentsCount>{comments.length} Comentários</CommentsCount>
      <CommentModal
        title="Comentários"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CommentInput
          placeholder="Escreva seu comentário"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SendButton type="primary" onClick={handleAddComment} style={{ marginTop: '10px' }}>
          Enviar
        </SendButton>
        <CommentList style={{ marginTop: '20px' }}>
          {comments.map((comment, index) => (
            <CommentItem key={index} style={{ marginBottom: '10px' }}>
              <CommentUser>{comment.user}:</CommentUser>
              <CommentText>{comment.text}</CommentText>
            </CommentItem>
          ))}
        </CommentList>
      </CommentModal>
    </div>
  );
};

export default ProductComments;
