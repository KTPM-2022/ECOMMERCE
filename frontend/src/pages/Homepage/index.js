import styles from './Homepage.module.scss';
import classnames from 'classnames/bind';
import CardItem from './CardItem';
import MenImage from 'src/assets/images/men.jpg';
import LadiesImage from 'src/assets/images/ladies.jpg';
import BoysImage from 'src/assets/images/boys.jpg';
import GirlsImage from 'src/assets/images/girls.jpg';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';

const cx = classnames.bind(styles);

function Homepage() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('outfit-of-the-week')}>
          <span className={cx('title-week')}>OUTFIT OF THE WEEK</span>
          <Link to="/productlist">
            <Button primary className={cx('shopnow-btn-week')}>
              Shop now
            </Button>
          </Link>
        </div>
        <div className={cx('card-list')}>
          <CardItem title="Men" image={MenImage} />
          <CardItem title="Ladies" image={LadiesImage} />
          <CardItem title="Boys" image={BoysImage} />
          <CardItem title="Girls" image={GirlsImage} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
