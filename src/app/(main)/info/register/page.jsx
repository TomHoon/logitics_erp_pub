import BreadCrumb from "@/component/common/BreadCrumb";
import MainTitleWrapper from "@/component/common/MainTitleWrapper";
import SearchBar from "@/component/common/SearchBar";

export default function page() {
    return (
        <div className="flex flex-col gap-[16px]">
            <BreadCrumb/>
            <MainTitleWrapper/>
            <SearchBar/>
        </div>
    )
}
