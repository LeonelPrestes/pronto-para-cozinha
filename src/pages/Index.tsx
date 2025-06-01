
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Tablet } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sistema de Pedidos - Restaurante
          </h1>
          <p className="text-xl text-gray-600">
            Selecione o modo de acesso
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Garçom</CardTitle>
              <CardDescription>
                Interface para seleção e envio de pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/garcom')}
                className="w-full"
                size="lg"
              >
                Acessar Modo Garçom
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Tablet className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Cozinha</CardTitle>
              <CardDescription>
                Interface para gerenciamento de pedidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/cozinha')}
                className="w-full"
                variant="outline"
                size="lg"
              >
                Acessar Modo Cozinha
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
