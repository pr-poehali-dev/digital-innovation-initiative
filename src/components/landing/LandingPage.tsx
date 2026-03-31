import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

export default function LandingPage() {
  return (
    <Layout>
      <div className="w-full">
        {sections.map((section) => (
          <Section
            key={section.id}
            {...section}
            isActive={true}
          />
        ))}
      </div>
    </Layout>
  )
}
