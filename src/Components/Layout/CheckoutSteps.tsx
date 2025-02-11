import React from "react";

interface CheckoutStepsProps {
  currentStep: number; 
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Carrinho" },
    { id: 2, label: "Pagamento" },
  ];

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="flex w-3/4 bg-gray-200 rounded-lg overflow-hidden">
      
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center px-6 py-3 relative transition-all ${
              currentStep >= step.id
                ? "bg-gray-200" // Etapa ativa ou já concluída
                : "bg-gray-400 opacity-75" // Etapas futuras
            }`}
          >
            {/* Número dentro do círculo */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                currentStep >= step.id ? "bg-black text-white" : "bg-gray-600 text-white"
              }`}
            >
              {step.id}
            </div>

            {/* Texto do passo */}
            <span
              className={`ml-2 font-medium ${
                currentStep >= step.id ? "text-black" : "text-gray-700"
              }`}
            >
              {step.label}
            </span>

            {/* Seta de transição entre os passos (exceto o último) */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute right-0 top-0 bottom-0 w-5 clip-triangle ${
                  currentStep > step.id ? "bg-gray-200" : "bg-gray-400"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;
