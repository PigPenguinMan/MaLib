// 클라이언트 컴포넌트 ? 
import filterList from "./filterlist";

const BookFilter = () => {
  const categoryList = filterList[0].category;

  return (
    <ul className="archiveCategoryFilterWrap flex flex-row overflow-x-scroll overflow-y-hidden items-center scrollbar-hide">
        {Object.values(categoryList).map((category)=>(
            <li key={category.mainGenreCd} className="archiveCategoryFilterInner px-2 py-1 mx-1 border rounded-md flex shrink-0 ">
                {category.mainGenreCdNm}
            </li>
        ))}
    </ul>
  )
};

export default BookFilter;
