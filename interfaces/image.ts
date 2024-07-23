export interface Image {
  src: string;
  href: string;
  platform?: {
    name: string;
    url: string;
  };
  creator?: {
    name: string;
    url: string;
  };
  alt?: string;
}
