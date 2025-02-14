import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";


import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/videoDetailsSidebar";
import { getFullDetailsOfCourse } from "../Services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../Slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <button
          className="md:hidden p-2 text-white absolute top-4 -left-2 z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <div ><RiMenuUnfoldFill fontSize={24} /></div>
          )}
        </button>
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        >
          <div
            className={`absolute left-0 top-0 h-fit w-64 bg-white transition-transform duration-300 ${
              isSidebarOpen ? "transform-none" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
          </div>
        </div>
        <div className="hidden md:block">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div className="h-[calc(100vh-3.5rem)] flex-1 mt-20 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}