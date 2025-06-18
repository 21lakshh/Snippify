import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKWFM5MUoxWTlETUpDTjZWSEtDMzBYNksiLCJ0ZW5hbnRfaWQiOiI3NWRkZDgzMjE3OTk3ZTRjMDU0MzY5ODRkYWFiYTgyZGM5ZGM5ZTIwYThhZTdkMzY0YWY1ZmZhY2U0MGU4YWQyIiwiaW50ZXJuYWxfc2VjcmV0IjoiMDRhMTNjNmItNWEzOS00MDVlLWJmZTUtODMxNDgwNmRlMWQ0In0.wH40kBajoddnm2iVhxzaQrsWq4tl79I9T6V_GXbcJkU",
}).$extends(withAccelerate())
  
  export default prisma;
  