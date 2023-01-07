import styles from './Homepage.module.scss';
import classnames from 'classnames/bind';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function CardItem({ title, image }) {
  return (
    <div className={cx('card-item')}>
      <div className={cx('card-item-container')} style={{ backgroundImage: `url(${image})` }}>
        <span className={cx('title')}>{title}</span>
        <Link to={`/productlist?genderFilter=${title}`}>
          <Button primary className={cx('shopnow-btn')}>
            Shop now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
