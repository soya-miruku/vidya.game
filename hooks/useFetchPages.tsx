import { useQuery } from "react-query";

export type FeaturedImage = {
  alt: string;
  src: string;
  srcSet: string;
  seoName: string;
  width: number;
  height: number;
  placeholderSrc: string;
}
export interface IFetchedPage {
  id: string;
  name: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    image?: FeaturedImage;
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

export interface IFetchPageProps {
  slug: string;
}

export const useFetchPage = ({ slug}: IFetchPageProps) => {
  const { data, isLoading, error } = useQuery<IFetchedPage>(`page-${slug}`, async () => {
    const response = await fetch(`/api/page?slug=${slug}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if(!response.ok) {
      throw new Error(response.statusText);
    }

    const page = await response.json();
    return {
      id: page.id,
      name: page.name,
      slug: page.slug,
      meta: {
        title: page.meta.title,
        description: page.meta.description,
        image: page.meta.image,
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
  }, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 60,
  })

  return {data, isLoading, error};
}

export interface IFetchPagesProps {
  limit?: number;
  type?: string;
}

export const useFetchPages = ({type, limit=3}: IFetchPagesProps) => {
  const {data, isLoading, error} = useQuery<IFetchedPage[]>(`fetch-page-${type}`, async () => {
    const response = await fetch(`/api/pages?type=${type}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if(!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();
    return json.map((page: any) => {
      return {
        id: page.id,
        name: page.name,
        slug: page.slug,
        meta: {
          title: page.meta.title,
          description: page.meta.description,
          image: page.meta.image,
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