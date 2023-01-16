import fetch from 'node-fetch'
import * as dotenv from 'dotenv'

dotenv.config()

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.STORYBLOK_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export async function getActivities() {
  const { data } = await fetchAPI(`{ ActivityItems { items { content { Title Images { alt name filename } } } } }`)
  return data.ActivityItems.items
}

export async function getTeamMembers() {
  const { data } = await fetchAPI(`{ TeammemberItems { items { created_at content { Name Title Email About Graduated Image { alt name filename } } } } }`)
  return data.TeammemberItems.items
}

export async function getPublications() {
  const { data } = await fetchAPI(`{ PublicationItems { items { content { Title Authors Venue Year Image { alt name filename } } } } }`)
  return data.PublicationItems.items
}

export async function getProjects() {
  const { data } = await fetchAPI(`{ ProjectItems { items { created_at content { Title About Link Image { alt name filename } } } } }`)
  return data.ProjectItems.items
}

export async function getInvestors() {
  const { data } = await fetchAPI(`{ InvestorItems { items { content { Image { alt name filename } } } } }`)
  return data.InvestorItems.items
}
