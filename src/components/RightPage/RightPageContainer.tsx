import { ComponentPropsWithoutRef, FC } from 'react'

import styles from './styles.module.scss'

type RightPageContainerProps = ComponentPropsWithoutRef<'div'>

const RightPageContainer: FC<RightPageContainerProps> = ({ className, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${className} ${styles.container}`}
    >
      <div className={styles.heading}>About</div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur nihil a nobis ea voluptatem unde blanditiis
      laboriosam iste, delectus vitae sint temporibus, similique amet quos, quasi quia atque quibusdam? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Possimus quam nihil similique? Asperiores iure voluptates inventore soluta dolorem animi
      mollitia ipsam excepturi molestias, impedit, voluptatem a natus repellat harum unde! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsam sed aliquid nesciunt assumenda magni
      fugiat cumque laboriosam placeat est quae temporibus veritatis beatae fugit accusantium praesentium molestiae, inventore
      non! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio aspernatur nihil a nobis ea voluptatem unde blanditiis
      laboriosam iste, delectus vitae sint temporibus, similique amet quos, quasi quia atque quibusdam? Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Possimus quam nihil similique? Asperiores iure voluptates inventore soluta dolorem animi
      mollitia ipsam excepturi molestias, impedit, voluptatem a natus repellat harum unde! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Optio aspernatur nihil a nobis ea voluptatem unde blanditiis laboriosam iste, delectus vitae sint temporibus,
      similique amet quos, quasi quia atque quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quam
      nihil similique? Asperiores iure voluptates inventore soluta dolorem animi mollitia ipsam excepturi molestias, impedit,
      voluptatem a natus repellat harum unde! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Sit ipsam sed aliquid nesciunt assumenda magni fugiat cumque laboriosam placeat est quae
      temporibus veritatis beatae fugit accusantium praesentium molestiae, inventore non! Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Optio aspernatur nihil a nobis ea voluptatem unde blanditiis laboriosam iste, delectus vitae sint
      temporibus, similique amet quos, quasi quia atque quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Possimus quam nihil similique? Asperiores iure voluptates inventore soluta dolorem animi mollitia ipsam excepturi molestias,
      impedit, voluptatem a natus repellat harum unde! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
      sit amet consectetur adipisicing elit.
      {children}
    </div>
  )
}

export default RightPageContainer
