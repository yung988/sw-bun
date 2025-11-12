import { getAllServices, getServiceBySlug } from '@/lib/services'
import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  // This route is deprecated - redirect to category page
  // Return empty array to generate no static paths
  return []
}

export default async function ServicePage({ params }: { params: Promise<{ kategorie: string; slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    // If service not found, redirect to services page
    redirect('/sluzby')
  }

  // If service is a subcategory (has parentId), find parent and redirect to parent category
  if (service.parentId) {
    const allServices = await getAllServices()
    const parent = allServices.find((s) => s.serviceId === service.parentId)
    if (parent) {
      redirect(`/sluzby/${parent.slug}`)
    }
  }

  // Otherwise redirect to the service category page
  redirect(`/sluzby/${service.slug}`)
}
