

export interface BookProps {
  mastrId: string;
  listSeCd: string;
  title: string;
  pictrWritrNm: string;
  sntncWritrNm: string;
  mainGenreCd: string;
  mainGenreCdNm: string;
  orginlNationCd: string;
  orginlNationCdNm: string;
  imageDownloadUrl: string;
}
export interface IResult {
  listSeCd: string;
  pageNo: number;
  resultMessage: string;
  resultState: string;
  totalcount: number;
  viewItemCnt: number;
}
export interface IItem {
  mastrId: string;
  listSeCd: string;
  listSeCdNm: string;
  prdctNm: string;
  title: string;
  subtitl: string | null;
  edtn: string | null;
  pictrWritrNm: string;
  sntncWritrNm: string;
  plscmpnIdNm: string | null;
  orginlTitle: string;
  originClCd: string | null;
  originClCdNm: string | null;
  stleClCd: string | null;
  stleClCdNm: string | null;
  mainGenreCd: string;
  mainGenreCdNm: string;
  outline: string;
  isbn: string;
  issn: string | null;
  setIsbn: string | null;
  pltfomCd: number;
  pltfomCdNm: string;
  pltfomCmpnyIdNm: string;
  ageGradCd: number;
  ageGradCdNm: string;
  pusryBeginDe: number;
  pusryEndDe: string | null;
  fnshYn: string;
  pblcateYn: string;
  webtoonPusryYn: string;
  wnpzCareer: string | null;
  dstrcpIdNm: string | null;
  pblicteDe: string | null;
  dtaTyCd: string | null;
  dtaTyCdNm: string | null;
  orginlNationCd: string;
  orginlNationCdNm: string;
  relDe: string | null;
  tlviseBeginDe: string | null;
  tlviseEndDe: string | null;
  bdcpn: string | null;
  makr: string | null;
  distr: string | null;
  auspc: string | null;
  mngt: string | null;
  stndrd: string | null;
  pgeCo: string | null;
  wt: string | null;
  prc: number | null;
  eventSeCd: string | null;
  eventSeCdNm: string | null;
  cnsleNm: string | null;
  imageDownloadUrl: string;
}
export interface IBookData {
  result: IResult;
  itemList: IItem[];
}
export interface ISearchResult {
  pageNo: number;
  resultMessage: string;
  resultState: string;
  totalcount: number;
  viewItemCnt: number;
}
export interface ISearchItem {
  prdctNm: string;
  title: string;
  subtitl: string | null;
  edtn: string | null;
  pictrWritrNm: string;
  sntncWritrNm: string;
  orginlTitle: string | null;
  mainGenreCdNm: string;
  outline: string;
  isbn: string;
  setIsbn: string | null;
  plscmpnIdNm: string | null;
  pltfomCdNm: string;
  ageGradCdNm: string;
  imageDownloadUrl: string;
}
export interface ISearchData {
  result: ISearchResult;
  itemList: ISearchItem;
}

export interface IBookFilterProps {
  filterState: {
    filterCheck: boolean;
    setFilterCheck: React.Dispatch<React.SetStateAction<boolean>>;
    bookFilter: string;
    setBookFilter: React.Dispatch<React.SetStateAction<string>>;
    selectedBookFilter: string;
    setSelectedBookFilter: React.Dispatch<React.SetStateAction<string>>;
  };
}

export interface IArchiveContentProps {
  itemList: IItem;
  selectedBookFilter: string;
}
// export interface ISignUpRequestBody{
//   Email : string ;
//   Password : string ;
//   Name : string ;
//   Role : string ;
//   Created_At : string ;
//   Updated_At : string ;
//   Profile_pic : string ;
//   Is_Adult : boolean ;
// }

export interface IIsLoginProp{
  isLogin : boolean;
  setIsLogin : React.Dispatch<React.SetStateAction<boolean>>;
  user? : {
    id: string ; 
    name : string ; 
    role : string ;
  }
}

export interface ISignupRequestBody {
  AccountName: string;
  Password: string;
  PasswordAgain: string;
  Name: string;
  IsAdult: boolean;
}

export interface ISigninRequsetBody {
  AccountName: string;
  Password: string;
}


export interface IDefaultUser {
  AccountName : string ;
  Password : string ;
  Name : string ;
  Role : string ;
  Created_At : string ;
  Updated_At : string ;
  Profile_pic : string ;
  Is_Adult : boolean ;
}

export interface IBoardContent {
    _id : string;
    contentText :string ;
    heart : string; 
    reply : string; 
    userImg : string | null;
    userName : string; 
}


export interface IBoardGETResponse {
  success : boolean; 
  contents : IBoardContent[] ;
}
