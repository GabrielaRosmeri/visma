import { useEffect, useState } from 'react';
import { FilterOutlined, EditFilled, DeleteFilled, ExclamationCircleFilled } from '@ant-design/icons';
import { Table, Col, Row, Breadcrumb, Layout, Typography, Button, Input, InputNumber, Modal, Checkbox, Tooltip, Form, Select, Space, theme } from 'antd';
import { http } from "../../http";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

const filterDataByColumn = async (column) => {
    const response = await http.getReq(`/divisions/filter/${column}`);
    return response;
};

const MainContent = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [uniqueNames, setUniqueNames] = useState([]);

    const [editingData, setEditingData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalEditing, setIsModalEditing] = useState(false);
    const [options, setOptions] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const form = Form.useForm()[0];

    const fetchData = async (page, pageSize, filter, sorter) => {
        setLoading(true);
        filter = filter ? JSON.stringify(filter) : '';
        sorter = sorter ? JSON.stringify(sorter) : '';
        try {
            const response = await http.getReq(`/divisions?page=${page}&size=${pageSize}&filter=${filter}&sorter=${sorter}`);
            setData(response.data);
            setPagination({
                ...pagination,
                current: page,
                total: response.total,
                filter: filter,
                sorter: sorter
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTableChange = (pagination, filter, sorter) => {
        filter = Object.keys(Object(filter)).length === 0 ? '' : filter;
        sorter = Object.keys(Object(sorter)).length === 0 ? '' : sorter;
        fetchData(pagination.current, pagination.pageSize, filter, sorter);
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, []);

    useEffect(() => {
        const fetchUniqueNames = async () => {
            const names = await filterDataByColumn('name');
            const nameMap = names.map((item) => ({
                label: item,
                value: item
            }));
            setUniqueNames(nameMap);
        };

        fetchUniqueNames();
    }, []);

    const handleConfirm = (selectedKeys) => {
        fetchData(pagination.current, pagination.pageSize, selectedKeys);
    };

    const handleClearFilters = () => {
        setUniqueNames([]);
    };

    const RenderFilterDropdown = ({ setSelectedKeys, selectedKeys }) => {
        return (
            <div style={{ padding: 8 }}>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    <Checkbox.Group value={selectedKeys} onChange={setSelectedKeys} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        {uniqueNames.map((option) => (
                            <div key={option.value} style={{ marginBottom: '8px' }}>
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                    <Button type="primary" onClick={() => handleConfirm(selectedKeys)}>
                        Filtrar
                    </Button>
                    <Button onClick={handleClearFilters}>Restablecer</Button>
                </div>
            </div>
        );
    };

    const HandleEdit = async (recordId) => {
        setIsModalEditing(true);
        setIsModalVisible(true);
        setFormErrors([]);
        const responseOption = await http.getReq(`/divisions`);
        setOptions(responseOption);
        const response = await http.getReq(`/divisions/${recordId}`);
        form.setFieldsValue(response);
        setEditingData(response);
    };

    const HandleCreate = async () => {
        setIsModalEditing(false);
        setIsModalVisible(true);
        setFormErrors([]);
        const responseOption = await http.getReq(`/divisions`);
        setOptions(responseOption);
        form.setFieldsValue({ name: null, parent_id: null, employee_count: null, level: null, ambassador_name: null });
        setEditingData({ name: null, parent_id: null, employee_count: null, level: null, ambassador_name: null });
    };

    const handleModalOk = async () => {
        try {
            if (isModalEditing) await http.updateReq(`/divisions/${editingData.id}`, editingData);
            else await http.createReq(`/divisions`, editingData);
            setIsModalVisible(false);
            setEditingData(null);
            fetchData(pagination.current, pagination.pageSize); // Vuelve a cargar los datos actualizados
        } catch (error) {
            setFormErrors(error.data.errors);
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingData(null);
    };

    const handleInputChange = (name, value) => {
        console.info(editingData);
        setEditingData({ ...editingData, [name]: value });
    };

    const HandleDeleted = (recordId) => {
        confirm({
            title: '¿Desea eliminar este registro?',
            icon: <ExclamationCircleFilled />,
            content: 'Se eliminara registro de división y sus datos de colaborador',
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteDivision(recordId);
                fetchData(1, 10);
            },
        });
    };

    const deleteDivision = async (recordId) => {
        try {
            await http.deleteReq(`/divisions/${recordId}`);
        } catch (error) {
            console.error('Error deleting division:', error);
        }
    };
    const columns = [
        {
            title: 'División',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            width: '20%',
            filterSearch: true,
            filterDropdown: RenderFilterDropdown,
            filterIcon: <FilterOutlined />
        },
        {
            title: 'División superior',
            dataIndex: 'parent',
            key: 'parent.name',
            render: (parent) => parent?.name ?? '-----',
            sorter: false
        },
        {
            title: 'Colaboradores',
            dataIndex: 'employee_count',
            key: 'employee_count',
            sorter: true
        },
        {
            title: 'Nivel',
            dataIndex: 'level',
            key: 'level',
            sorter: true,
            filterSearch: true
        },
        {
            title: 'Subdivisiones',
            dataIndex: 'subdivisions_count',
            key: 'subdivisions_count',
            sorter: true,
            filterSearch: true,
            width: '5%'
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Embajadores',
            dataIndex: 'ambassador_name',
            key: 'ambassador_name',
            render: (emb) => emb ?? '---',
            sorter: true
        },
        {
            title: 'Acción',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <Button type="dashed" shape="circle" icon={<EditFilled />} onClick={() => HandleEdit(record.id)} />
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button type="dashed" shape="circle" icon={<DeleteFilled />} onClick={() => HandleDeleted(record.id)} danger />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Content style={{ padding: '0px' }}>
            <div className="site-layout-content" style={{ background: colorBgContainer, padding: '0 20px' }}>
                <Row>
                    <Col span={24}><Title level={4} style={{ margin: '0px' }}>Organización</Title></Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Breadcrumb separator=" " style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Divisiones</Breadcrumb.Item>
                            <Breadcrumb.Item>Colaboradores</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
            </div>
            <div className="site-layout-content" style={{ padding: '0 30px' }}>
                <Row style={{ padding: '10px' }}>
                    <Col span={24}>
                        <Tooltip title="Registrar">
                            <Button type="primary" icon={<EditFilled />} onClick={() => HandleCreate(null)}>
                                Registrar
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            rowKey={(record) => record.id}
                            rowSelection={{}}
                            dataSource={data}
                            loading={loading}
                            pagination={pagination}
                            onChange={handleTableChange}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <span>
                                        {record.subdivisions.map((item) => (
                                            <p>{item.name}</p>
                                        ))}
                                    </span>
                                ),
                            }}
                        />
                    </Col>
                </Row>
            </div>
            <Modal
                title={isModalEditing ? 'Editar División' : 'Registrar División'}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
                    <Form.Item
                        label="División"
                        name="name"
                        rules={[{ required: true, message: 'Please enter a value.' }]}
                        validateStatus={formErrors.name ? 'error' : ''}
                        help={formErrors.name}
                    >
                        <Input value={editingData?.name} onChange={(value) => handleInputChange("name", value.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="División superior"
                        name="parent_id"
                    >
                        <Select
                            value={editingData?.parent_id} onChange={(value) => handleInputChange("parent_id", value)}>
                            <Option value={null} key={null}>
                                Ninguno
                            </Option>
                            {options.map((option) => (
                                <Option value={option.id} key={option.id}>
                                    {option.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Colaboradores" name="employee_count" rules={[{ required: true, message: 'Please enter a value.' }]}>
                        <InputNumber min={0} value={editingData?.employee_count} onChange={(value) => handleInputChange("employee_count", value)} />
                    </Form.Item>
                    <Form.Item label="Nivel" name="level" rules={[{ required: true, message: 'Please enter a value.' }]}>
                        <InputNumber min={0} max={20} value={editingData?.level} onChange={(value) => handleInputChange("level", value)} />
                    </Form.Item>
                    <Form.Item
                        label="Embajador"
                        name="ambassador_name"
                    >
                        <Input value={editingData?.ambassador_name} onChange={(value) => handleInputChange("ambassador_name", value.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default MainContent;
