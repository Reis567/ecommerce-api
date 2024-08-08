import React from 'react';
import { Modal, Form, Input as AntdInput, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface ProductModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  isEditing: boolean;
  categories: any[]; // Lista de categorias de produtos
  conditions: any[]; // Lista de condições de produtos
  tags: any[]; // Lista de tags de produtos
}

const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onOk,
  onCancel,
  form,
  isEditing,
  categories,
  conditions,
  tags,
}) => {
  return (
    <Modal
      title={isEditing ? 'Editar Produto' : 'Adicionar Produto'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Por favor insira o título do produto' }]}
        >
          <AntdInput />
        </Form.Item>
        <Form.Item name="detail" label="Descrição">
          <AntdInput.TextArea />
        </Form.Item>
        <Form.Item
          name="price"
          label="Preço"
          rules={[{ required: true, message: 'Por favor insira o preço do produto' }]}
        >
          <AntdInput type="number" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Categoria"
          rules={[{ required: true, message: 'Por favor selecione a categoria do produto' }]}
        >
          <Select>
            {categories.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="condition"
          label="Condição"
          rules={[{ required: true, message: 'Por favor selecione a condição do produto' }]}
        >
          <Select>
            {conditions.map(condition => (
              <Select.Option key={condition.id} value={condition.id}>
                {condition.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
        >
          <Select mode="multiple" placeholder="Selecione tags">
            {tags.map(tag => (
              <Select.Option key={tag.id} value={tag.id}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="photo_product1" label="Foto 1">
          <Upload name="photo_product1" listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="photo_product2" label="Foto 2">
          <Upload name="photo_product2" listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="photo_product3" label="Foto 3">
          <Upload name="photo_product3" listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="photo_product4" label="Foto 4">
          <Upload name="photo_product4" listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="photo_product5" label="Foto 5">
          <Upload name="photo_product5" listType="picture">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
