export interface IProps {
  autoplay?: number
  activeSlide?: number
  slides?: ISliders
}

export interface ISliders {
  images: string[]
  smallImages?: string[]
}
  