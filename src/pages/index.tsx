import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

interface Props {
  data: {
    allWpPost: any
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const BlogIndex = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allWpPost.edges

  return (
    <Layout location={window.location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }: any) => {
        const title = node.title || node.slug
        return (
          <div key={node.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.content || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
query {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(
      limit: 5
      skip: 0
    ) {
      edges {
        node {
          content
          slug
          date
          title
        }
      }
    }
  }
`