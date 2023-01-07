import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import FilterItem from './FilterItem';
import BrandList from './BrandList';
import AvailableList from './AvailableList';
import PriceList from './PriceList';
import SizeList from './SizeList';
import ColorList from './ColorList';
const cx = classnames.bind(styles);

function UserSidebar({ setFilterList, filterList }) {
  const productCategory = useSelector((state) => state.productCategory.value);
  const handleAddCategory = (e, categoryName) => {
    setFilterList((prev) => {
      return { ...prev, categoryFilter: categoryName };
    });
  };
  return (
    <aside className={cx('wrapper', 'col', 'col-2')}>
      <div className={cx('container')}>
        <div className={cx('category')}>
          <span className={cx('category-title')}>Category</span>
          <ul className={cx('category-list')}>
            <li
              className={cx('category-item')}
              onClick={(e) => {
                setFilterList((prev) => {
                  return { ...prev, categoryFilter: null };
                });
              }}
            >
              All {filterList.typeFilter}
            </li>
            {productCategory
              ?.find((a) => a.gender === filterList.genderFilter)
              ?.typeValue.find((a) => a.name === filterList.typeFilter)?.categories &&
              productCategory
                .find((a) => a.gender === filterList.genderFilter)
                .typeValue.find((a) => a.name === filterList.typeFilter)
                .categories.map((categoryName, index) => {
                  return (
                    <li
                      key={index}
                      className={cx('category-item', { active: filterList.categoryFilter === categoryName })}
                      onClick={(e) => handleAddCategory(e, categoryName)}
                    >
                      {categoryName}
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className={cx('filter')}>
          <span className={cx('filter-title')}>Filter</span>
          <ul className={cx('filter-list')}>
            <FilterItem name="Size">
              <SizeList values={['S', 'M', 'L', 'XL']} setFilterList={setFilterList} />
            </FilterItem>
            <FilterItem name="Color">
              <ColorList values={['Blue', 'Brown', 'Red', 'Black']} setFilterList={setFilterList} />
            </FilterItem>
            <FilterItem name="Brand">
              <BrandList values={['Zara', 'H&M', 'Pull&Bear', 'Dior', 'Chanel']} setFilterList={setFilterList} />
            </FilterItem>
            <FilterItem name="Price">
              <PriceList min={0} max={100} setFilterList={setFilterList} />
            </FilterItem>
            <FilterItem name="Available">
              <AvailableList values={['In store', 'Out of stock']} setFilterList={setFilterList} />
            </FilterItem>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default UserSidebar;
