import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const StyledLink = styled(Link)`
  font-weight: ${(props: { active: boolean }) => props.active ? 'bold' : 'inherit' };
  color: ${(props: { active: boolean }) => props.active ? '#000' : '#007acc' };
  padding: 5px;
`

interface Props {
  data: {
    allWpPost: {
      edges: [
        {
          node: {
            content: string
            date: string
            slug: string
            title: string
          }
        }
      ]
    }
    site: {
      siteMetadata: {
        title: string
      }
    }
  },
  pageContext: {
    currentPage: number
    limit: number
    numPages: number
    skip: number
  }
}

const BlogList = ({ data, pageContext }: Props) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allWpPost.edges

  console.log(data)
  console.log(pageContext)
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
  const nextPage = "/" + (currentPage + 1).toString()

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
              <Link style={{ boxShadow: `none` }} to={`/` + node.slug}>
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
      <div>
        {!isFirst && (
          <StyledLink to={`/blog` + prevPage} rel="prev">
            ← Previous Page
          </StyledLink>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <StyledLink
            key={`pagination-number${i + 1}`}
            to={`/blog/${i === 0 ? "" : i + 1}`}
            active={i + 1 === currentPage ? true : false}
          >
            {i + 1}
          </StyledLink>
        ))}
        {!isLast && (
          <StyledLink to={`/blog` + nextPage} rel="next">
            Next Page →
          </StyledLink>
        )}
      </div>
    </Layout>
  )
}

export default BlogList

export const pageQuery = graphql`
query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWpPost(
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          content
          date
          slug
          title
        }
      }
    }
  }
`
