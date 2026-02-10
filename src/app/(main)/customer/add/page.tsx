import CustomerFormClient from "./CustomerScreenClient";

export default function CustomerPage() {
  return (
    <div className="p-7">
      <h1 className="mb-3 text-2xl font-bold">Add Customer</h1>
      <CustomerFormClient />
    </div>
  );
}
