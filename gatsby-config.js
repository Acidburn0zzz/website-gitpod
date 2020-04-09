'use strict'

module.exports = {
    siteMetadata: {
        title: 'Gitpod - Online IDE for GitHub and GitLab',
        description: 'Gitpod is an online IDE for GitHub and GitLab that launches ready-to-code dev environments for any project with a single click.',
        siteUrl: 'https://www.gitpod.io',
        author: {
            name: 'TypeFox',
            url: 'https://www.typefox.io',
            email: 'contact@gitpod.io'
        }
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'docs',
                path: `${__dirname}/src/docs`
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'blog',
                path: `${__dirname}/src/blog`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/docs/`,
            },
        },
        {
            // Exclude pages from the page build -- https://www.gatsbyjs.org/packages/gatsby-plugin-exclude/
            resolve: 'gatsby-plugin-exclude',
            options: { paths: ['/docs/README'] },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-embed-video",
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 400, // Optional: Overrides optional.ratio
                            related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
                            noIframeBorder: true //Optional: Disable insertion of <style> border: 0
                        }
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1rem'
                        }
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-gitpod',
                    'gatsby-remark-autolink-headers',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-external-links',
                    'gatsby-remark-smartypants',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1140,
                            quality: 90,
                            linkImagesToOriginal: false,
                            backgroundColor: '#fff'
                        }
                    }
                ]
            }
        },
        'gatsby-transformer-json',
        'gatsby-plugin-emotion',
        'gatsby-plugin-typescript',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-catch-links',
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: "UA-71727855-2",
                // Puts tracking script in the head instead of the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ["/docs/README"],
                // Enables Google Optimize using your container Id
                // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // Enables Google Optimize Experiment ID
                // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Any additional create only fields (optional)
                // sampleRate: 5,
                // siteSpeedSampleRate: 10,
                // cookieDomain: "example.com",
            },
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                  id: "GTM-P453T6T",

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
               includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                // Defaults to null
                defaultDataLayer: { platform: "gatsby" },

                // Specify optional GTM environment details.
                gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
                dataLayerName: "YOUR_DATA_LAYER_NAME",
            },
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                exclude: ['/github-teacher-toolbox'],
            },
        },
        {
            resolve: `gatsby-plugin-algolia-docsearch`,
            options: {
                apiKey: '1a880f3060e9ff81ff84087fc90878fc',
                indexName: 'gitpod',
                inputSelector: '#doc-search',
                debug: false // Set debug to true if you want to inspect the dropdown
            }
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    site {
                        siteMetadata {
                            title
                            description
                            siteUrl
                            site_url: siteUrl
                        }
                    }
                }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    author: edge.node.frontmatter.author,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [
                                        { "content:encoded": edge.node.html },
                                        {"teaserImage": (edge.node.frontmatter.teaserImage.startsWith('http') ? '' : 'https://www.gitpod.io') + edge.node.frontmatter.teaserImage}
                                    ],
                                })
                            })
                        },
                        query: `
                        {
                        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {teaserImage: {ne: null}}}) {
                            edges {
                            node {
                                excerpt
                                html
                                fields {
                                slug
                                }
                                frontmatter {
                                title
                                date
                                author
                                image
                                subtitle
                                teaserImage
                                url
                                }
                            }
                            }
                        }
                        }
                        `,
                        output: "/rss.xml",
                        title: "Gitpod.io RSS Feed",
                    },
                ],
            },
        },
    ]
}
