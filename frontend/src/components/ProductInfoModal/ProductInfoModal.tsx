import React from 'react';
import { Modal, Form, Input as AntdInput } from 'antd';

interface ProductModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  isEditing: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onOk, onCancel, form, isEditing }) => {
  return (
    <Modal
      title={isEditing ? "Editar Produto" : "Adicionar Produto"}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Por favor insira o título do produto' }]}>
          <AntdInput />
        </Form.Item>
        <Form.Item name="detail" label="Descrição">
          <AntdInput.TextArea />
        </Form.Item>
        <Form.Item name="price" label="Preço" rules={[{ required: true, message: 'Por favor insira o preço do produto' }]}>
          <AntdInput type="number" />
        </Form.Item>
        {/* Adicione mais campos conforme necessário */}
      </Form>
    </Modal>
  );
};

export default ProductModal;
