import { Avatar, Card, List, Spin, Typography } from "antd";
import { Users, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";

const { Title, Text } = Typography;

interface User {
  id: string;
  email: string;
  createAt: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const { data } = await api.post("/manager");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    getAllUser();
  }, []);

  const getRandomColor = (email: string) => {
    const colors = ['#1677ff', '#eb2f96', '#52c41a', '#faad14', '#722ed1', '#13c2c2'];
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Title level={2} style={{ margin: 0, fontWeight: 700 }} className="text-gray-800">
              Dashboard
            </Title>
            <Text type="secondary" className="text-lg">
              Overview and User Management
            </Text>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-105">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Users size={28} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Users</div>
              <div className="text-3xl font-extrabold text-gray-900">{users.length}</div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} className="text-gray-400" />
            <Title level={4} style={{ margin: 0 }} className="text-gray-700">Registered Users</Title>
          </div>

          <List
            grid={{ gutter: 24, xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
            dataSource={users}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  bordered={false}
                  className="h-full shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
                  bodyStyle={{ padding: '20px' }}
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      size={48}
                      style={{
                        backgroundColor: getRandomColor(item.email),
                        verticalAlign: 'middle',
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      {item.email[0].toUpperCase()}
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <Text
                        strong
                        className="text-gray-800 text-lg truncate block"
                        title={item.email}
                      >
                        {item.email}
                      </Text>
                      <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs font-medium">
                        <Calendar size={14} />
                        <span>Joined {new Date(item.createAt).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-50 text-[10px] text-gray-300 font-mono truncate">
                        ID: {item.id}
                      </div>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}