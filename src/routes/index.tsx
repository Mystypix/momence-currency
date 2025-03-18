import { createFileRoute } from '@tanstack/react-router'
import { Converter } from "../pages/Converter.tsx";

export const Route = createFileRoute('/')({
  component: Converter,
})
