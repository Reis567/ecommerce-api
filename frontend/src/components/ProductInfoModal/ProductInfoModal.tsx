import React, { useEffect } from 'react';
import { Modal, Form, Input as AntdInput, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface ProductModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  isEditing: boolean;
  categories: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{ id: number; title: string; detail: string }>;
  };
  conditions: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{ id: number; condition: string }>;
  };
  tags: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{ id: number; name: string }>;
  };
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
  const categoryOptions = categories.results;
  const conditionOptions = conditions.results;
  const tagOptions = tags.results;


  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('detail', values.detail);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('condition', values.condition);
      
      if (values.tags) {
        values.tags.forEach(tag => formData.append('tags', tag));
      }

      ['photo_product1', 'photo_product2', 'photo_product3', 'photo_product4', 'photo_product5'].forEach(photo => {
        if (values[photo] && values[photo].file) {
          formData.append(photo, values[photo].file.originFileObj);
        }
      });

      await axios.post('http://127.0.0.1:8000/api/v1/vendor-products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      message.success('Produto adicionado com sucesso!');
      onOk(); // Fechar o modal após sucesso

      // Atualizar a lista de produtos ou recarregar a página
      window.location.reload(); // Recarregar a página
      // ou
      // fetchVendorProducts(); // Função para recarregar a lista de produtos via API
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      message.error('Erro ao adicionar produto. Por favor, tente novamente.');
    }
  };
  const getImageFileList = (url: string | null) => {
    const prefix = 'http://127.0.0.1:8000/';
    return url ? [{ uid: url, name: url.split('/').pop() || 'image', status: 'done', url: `${prefix}${url}` }] : [];
  };

  const getInitialFileList = () => {
    const product = form.getFieldsValue(true); 
    console.log('Dados do produto:', product); // Verifique os dados do produto
    return {
      photo_product1: getImageFileList(product.images?.[0] || null),
      photo_product2: getImageFileList(product.images?.[1] || null),
      photo_product3: getImageFileList(product.images?.[2] || null),
      photo_product4: getImageFileList(product.images?.[3] || null),
      photo_product5: getImageFileList(product.images?.[4] || null),
    };
  };

  useEffect(() => {
    if (isEditing && open) {
      const initialFileList = getInitialFileList();
      console.log('Arquivo inicial:', initialFileList); // Verifique a lista inicial de arquivos
      form.setFieldsValue({
        photo_product1: initialFileList.photo_product1,
        photo_product2: initialFileList.photo_product2,
        photo_product3: initialFileList.photo_product3,
        photo_product4: initialFileList.photo_product4,
        photo_product5: initialFileList.photo_product5,
      });
    }
  }, [isEditing, open, form]);



  
  return (
    <Modal
      title={isEditing ? 'Editar Produto' : 'Adicionar Produto'}
      open={open}
      onOk={handleSubmit}
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
        {['photo_product1', 'photo_product2', 'photo_product3', 'photo_product4', 'photo_product5'].map((photo, index) => (
          <Form.Item key={photo} name={photo} label={`Foto ${index + 1}`}>
            <Upload
              name={photo}
              listType="picture"
              fileList={form.getFieldValue(photo)} // Use fileList em vez de value
              onChange={(info) => form.setFieldsValue({ [photo]: info.fileList })}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default ProductModal;
