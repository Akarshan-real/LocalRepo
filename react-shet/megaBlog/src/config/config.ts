type AppwriteConfig = {
    appWriteUrl: string
    appWriteProjectId: string
    appWriteDataBaseId: string
    appWriteBucketId: string
    appWriteTableId: string
};

function getEnv(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
};

const conf: AppwriteConfig = {
  appWriteUrl: getEnv("VITE_APPWRITE_URL"),
  appWriteProjectId: getEnv("VITE_APPWRITE_PROJECT_ID"),
  appWriteDataBaseId: getEnv("VITE_APPWRITE_DATABASE_ID"),
  appWriteBucketId: getEnv("VITE_APPWRITE_BUCKET_ID"),
  appWriteTableId: getEnv("VITE_APPWRITE_TABLE_ID")
};

export default conf;