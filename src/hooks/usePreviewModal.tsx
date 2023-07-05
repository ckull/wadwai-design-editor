import { create } from 'zustand';

interface PreviewModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  dataURL: string;
  setDataURL: (value: string) => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  dataURL: '',
  setDataURL: (value) => set({ dataURL: value}),
}));


export default usePreviewModal;