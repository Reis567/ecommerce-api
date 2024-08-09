import React from 'react';
import { Modal, Form, Input as AntdInput, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface ProductModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  isEditing: boolean;
  categories: { count: number; next: string | null; previous: string | null; results: Array<{ id: number; title: string; detail: string }> };
  conditions: { count: number; next: string | null; previous: string | null; results: Array<{ id: number; condition: string }> };
  tags: { count: number; next: string | null; previous: string | null; results: Array<{ id: number; name: string }> };
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onOk,
  onCancel,
  form,
  isEditing,
  categories = { count: 0, next: null, previous: null, results: [] },
  conditions = { count: 0, next: null, previous: null, results: [] },
  tags = { count: 0, next: null, previous: null, results: [] },
}) => {
  // Acessando o array de resultados
  const categoryOptions = categories.results;
  const conditionOptions = conditions.results;
  const tagOptions = tags.results;

  return (
    <Modal
      title={isEditing ? 'Editar Produto' : 'Adicionar Produto'}
      open={open}
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
            {categoryOptions.map(category => (
              <Select.Option key={category.id} value={category.id}>
                {category.title}
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
            {conditionOptions.map(condition => (
              <Select.Option key={condition.id} value={condition.id}>
                {condition.condition}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="multiple" placeholder="Selecione tags">
            {tagOptions.map(tag => (
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
