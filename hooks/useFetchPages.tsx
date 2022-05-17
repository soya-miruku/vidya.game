import { useContext } from "react";
import { ReactBricksContext } from "react-bricks";
import { useQuery } from "react-query";

export interface IFetchedPage {
  id: string;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    featuredImage?: string;
  };
  type: string;
  customValues: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: string[];
  author: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
  }
}

export interface IFetchPropPages {
  limit?: number;
}

export const useFetchPages = ({type, limit=3}) => {
  const {data, isLoading, error} = useQuery<IFetchedPage[]>(`fetch-page-${type}`, async () => {
    const response = await fetch(`/api/pages?type=${type}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    return json.map((page: any) => {
      return {
        id: page.id,
        name: page.name,
        slug: page.slug,
        meta: {
          title: page.meta.title,
          description: page.meta.description,
          featuredImage: page.meta.featuredImage,
        },
        author: {
          firstName: page.author.firstName,
          lastName: page.author.lastName,
          email: page.author.email,
          avatarUrl: page.author.avatarUrl,
        },
        type: page.type,
        customValues: page.customValues,
        status: page.status,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
        publishedAt: page.publishedAt,
        tags: page.tags,
      }
    })
  }, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 60,
  });

  return {data, isLoading, error};
}