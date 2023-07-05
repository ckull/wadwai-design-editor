import axiosApi from "src/utils/api"

export interface metadataProps {
    format: string;
    size: number;
    width: number;
    height: number;
    space: string;
    channels: number;
    depth: string;
    density: number;
    isProgressive: boolean;
    hasProfile: boolean;
    hasAlpha: boolean;
}

const getMetadata = async (base64: string) => {
  try {
    const blob = await fetch(base64).then((res) => res.blob())
    const formData = new FormData()

    formData.append("file", blob)

    const response = await axiosApi.post("/metadata", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log('response: ', response)

    return response.data
  } catch (err) {
    throw err
  }
}

export default getMetadata
