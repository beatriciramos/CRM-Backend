import prisma from "../../prisma";
import * as customerRepository from "./customer.repository";

type CreateCustomerProps = {
  name: string;
  email: string;
  phone: string | undefined;
  document: string | null;
  createdByUserId: string;
};

export async function createCustomer(data: CreateCustomerProps, role: string) {
  const user = await prisma.user.findUnique({
    where: { id: data.createdByUserId },
  });
  // console.log(user);
  if (!user) throw new Error("Invalid user");
  if (!["SELLER", "ADMIN"].includes(role)) {
    throw new Error("Only SELLER or ADMIN can create customers");
  }

  return customerRepository.create(data);
}

export async function listCustomers() {
  return customerRepository.findMany();
}

export async function getById(id: string) {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error("Customer not found");
  return customer;
}

export const updateCustomer = async (id: string, data: any) => {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error("Customer not found");
  return customerRepository.update(id, data);
};

export const deleteCustomer = async (id: string) => {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error("Customer not found");
  return customerRepository.softDelete(id);
};

export const activateCustomer = async (id: string) => {
  const customer = await customerRepository.findById(id);
  if (!customer) throw new Error("Customer not found");
  return customerRepository.activate(id);
};
