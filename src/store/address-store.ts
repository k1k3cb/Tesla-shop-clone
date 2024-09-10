import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AddressState {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
      };
    
      // Methods
      setAddress: (address: AddressState["address"]) => void;
}

export const useAddressStore = create<AddressState>()(
    persist(
      (set, get) => ({
        address: {
          firstName: "",
          lastName: "",
          address: "",
          address2: "",
          postalCode: "",
          city: "",
          country: "",
          phone: "",
        },
  
        setAddress: (address) => {
          set({ address });
        },
      }),
      {
        name: "address-storage",
      }
    )
  );