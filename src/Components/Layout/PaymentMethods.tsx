const PaymentMethods = () => {
    return (
      <div className="bg-white py-4 flex justify-center border-t border-gray-200 w-full">
        <div className="flex justify-center items-center gap-6 max-w-[800px] w-full">
          <img src="/img/mastercard.png" alt="Mastercard" className="h-8" />
          <img src="/img/visa.png" alt="Visa" className="h-8" />
          <img src="/img/amex.png" alt="Amex" className="h-8" />
          <img src="/img/elo.png" alt="Elo" className="h-8" />
          <img src="/img/hipercard.png" alt="Hipercard" className="h-8" />
          <img src="/img/discover.png" alt="Discover" className="h-8" />
          <img src="/img/clearsale.png" alt="ClearSale" className="h-8" />
        </div>
      </div>
    );
  };
  
  export default PaymentMethods;
  