// Simulated database with realistic Pakistani academic data
export interface Student {
  id: string
  rollNumber: string
  name: string
  fatherName: string
  cnic: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  admissionDate: string
  programId: string
  currentSemester: number
  status: "active" | "suspended" | "graduated" | "dropped"
  cgpa: number
  totalCredits: number
  completedCredits: number
  profileImage?: string
}

export interface Teacher {
  id: string
  employeeId: string
  name: string
  designation: string
  department: string
  qualification: string
  email: string
  phone: string
  specialization: string[]
  experience: number
  profileImage?: string
}

export interface Program {
  id: string
  name: string
  code: string
  type: "BS" | "ADP" | "MS" | "MPhil" | "PhD"
  duration: number // in semesters
  totalCredits: number
  department: string
  description: string
  eligibility: string
  feeStructure: {
    admissionFee: number
    semesterFee: number
    examFee: number
  }
}

export interface Course {
  id: string
  name: string
  code: string
  credits: number
  semester: number
  programId: string
  teacherId: string
  description: string
  prerequisites: string[]
  learningOutcomes: string[]
  syllabus: {
    week: number
    topic: string
    hours: number
  }[]
  assessmentCriteria: {
    type: string
    weightage: number
  }[]
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  semester: number
  year: number
  status: "enrolled" | "completed" | "failed" | "withdrawn"
  grade?: string
  gradePoints?: number
  percentage?: number
  attendance: number
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  type: "assignment" | "quiz" | "project" | "presentation"
  totalMarks: number
  dueDate: string
  submissionDate?: string
  instructions: string
  attachments: string[]
  status: "draft" | "published" | "closed"
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  submissionDate: string
  content: string
  attachments: string[]
  marksObtained?: number
  feedback?: string
  status: "submitted" | "graded" | "late" | "pending"
}

export interface Lecture {
  id: string
  courseId: string
  title: string
  description: string
  week: number
  duration: number
  type: "video" | "document" | "presentation" | "live"
  content: string
  resources: {
    title: string
    type: string
    url: string
    size?: string
  }[]
  completed: boolean
}

// Bulk User Interface
export interface BulkUser {
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  phone?: string
  cnic?: string
  fatherName?: string
  address?: string
  dateOfBirth?: string
  program?: string
  designation?: string
  department?: string
  qualification?: string
  specialization?: string
  experience?: number
}

// Mock Database
export const mockDatabase = {
  // Programs offered at Dyal Singh College
  programs: [
    {
      id: "prog_001",
      name: "Bachelor of Science in Computer Science",
      code: "BS-CS",
      type: "BS" as const,
      duration: 8,
      totalCredits: 132,
      department: "Computer Science",
      description:
        "A comprehensive 4-year program covering all aspects of computer science including programming, algorithms, databases, networks, and software engineering.",
      eligibility: "Intermediate (FSc/ICS/A-Level) with minimum 60% marks",
      feeStructure: {
        admissionFee: 15000,
        semesterFee: 25000,
        examFee: 3000,
      },
    },
    {
      id: "prog_002",
      name: "Bachelor of Science in Mathematics",
      code: "BS-MATH",
      type: "BS" as const,
      duration: 8,
      totalCredits: 132,
      department: "Mathematics",
      description:
        "Advanced mathematics program covering pure and applied mathematics, statistics, and mathematical modeling.",
      eligibility: "Intermediate (FSc/A-Level) with Mathematics and minimum 60% marks",
      feeStructure: {
        admissionFee: 12000,
        semesterFee: 20000,
        examFee: 3000,
      },
    },
    {
      id: "prog_003",
      name: "Associate Degree Program in Computer Science",
      code: "ADP-CS",
      type: "ADP" as const,
      duration: 4,
      totalCredits: 66,
      department: "Computer Science",
      description: "2-year associate degree program providing foundation in computer science and programming.",
      eligibility: "Intermediate (FSc/ICS/A-Level) with minimum 50% marks",
      feeStructure: {
        admissionFee: 10000,
        semesterFee: 18000,
        examFee: 2500,
      },
    },
  ] as Program[],

  // Students data
  students: [
    {
      id: "std_001",
      rollNumber: "BS-CS-2024-001",
      name: "Muhammad Ahmad Khan",
      fatherName: "Abdul Rahman Khan",
      cnic: "37405-1234567-1",
      email: "ahmad.khan@student.dyalsingh.edu.pk",
      phone: "+92-300-1234567",
      address: "House No. 123, Street 5, Satellite Town, Gujranwala, Punjab",
      dateOfBirth: "2003-03-15",
      admissionDate: "2024-08-15",
      programId: "prog_001",
      currentSemester: 3,
      status: "active" as const,
      cgpa: 3.45,
      totalCredits: 54,
      completedCredits: 36,
    },
    {
      id: "std_002",
      rollNumber: "BS-CS-2024-002",
      name: "Fatima Shahid",
      fatherName: "Muhammad Shahid Ali",
      cnic: "37405-2345678-2",
      email: "fatima.shahid@student.dyalsingh.edu.pk",
      phone: "+92-301-2345678",
      address: "House No. 456, Block B, Model Town, Gujranwala, Punjab",
      dateOfBirth: "2003-07-22",
      admissionDate: "2024-08-15",
      programId: "prog_001",
      currentSemester: 3,
      status: "active" as const,
      cgpa: 3.72,
      totalCredits: 54,
      completedCredits: 36,
    },
  ] as Student[],

  // Teachers data
  teachers: [
    {
      id: "tch_001",
      employeeId: "GDSGC-CS-001",
      name: "Dr. Muhammad Tariq Mahmood",
      designation: "Associate Professor",
      department: "Computer Science",
      qualification: "PhD Computer Science (University of Punjab)",
      email: "tariq.mahmood@dyalsingh.edu.pk",
      phone: "+92-302-1234567",
      specialization: ["Data Structures", "Algorithms", "Database Systems"],
      experience: 12,
    },
    {
      id: "tch_002",
      employeeId: "GDSGC-CS-002",
      name: "Prof. Dr. Sadia Kiran",
      designation: "Professor",
      department: "Computer Science",
      qualification: "PhD Software Engineering (COMSATS University)",
      email: "sadia.kiran@dyalsingh.edu.pk",
      phone: "+92-303-2345678",
      specialization: ["Software Engineering", "Object Oriented Programming", "Web Development"],
      experience: 15,
    },
    {
      id: "tch_003",
      employeeId: "GDSGC-MATH-001",
      name: "Dr. Rashid Ahmad Bhatti",
      designation: "Assistant Professor",
      department: "Mathematics",
      qualification: "PhD Mathematics (Government College University)",
      email: "rashid.bhatti@dyalsingh.edu.pk",
      phone: "+92-304-3456789",
      specialization: ["Calculus", "Linear Algebra", "Differential Equations"],
      experience: 8,
    },
    {
      id: "tch_004",
      employeeId: "GDSGC-ENG-001",
      name: "Ms. Ayesha Malik",
      designation: "Lecturer",
      department: "English",
      qualification: "MS English Literature (University of Punjab)",
      email: "ayesha.malik@dyalsingh.edu.pk",
      phone: "+92-305-4567890",
      specialization: ["English Literature", "Academic Writing", "Communication Skills"],
      experience: 6,
    },
  ] as Teacher[],

  // Courses data
  courses: [
    // Semester 1 - BS Computer Science
    {
      id: "crs_001",
      name: "Calculus and Analytical Geometry",
      code: "MATH-101",
      credits: 3,
      semester: 1,
      programId: "prog_001",
      teacherId: "tch_003",
      description: "Introduction to differential and integral calculus, limits, continuity, and analytical geometry.",
      prerequisites: [],
      learningOutcomes: [
        "Understand fundamental concepts of calculus",
        "Apply differentiation and integration techniques",
        "Solve problems involving analytical geometry",
        "Use calculus in real-world applications",
      ],
      syllabus: [
        { week: 1, topic: "Functions and Limits", hours: 3 },
        { week: 2, topic: "Continuity and Derivatives", hours: 3 },
        { week: 3, topic: "Applications of Derivatives", hours: 3 },
        { week: 4, topic: "Integration Techniques", hours: 3 },
        { week: 5, topic: "Definite Integrals", hours: 3 },
        { week: 6, topic: "Applications of Integration", hours: 3 },
        { week: 7, topic: "Coordinate Geometry", hours: 3 },
        { week: 8, topic: "Conic Sections", hours: 3 },
      ],
      assessmentCriteria: [
        { type: "Assignments", weightage: 20 },
        { type: "Quizzes", weightage: 20 },
        { type: "Mid-term Exam", weightage: 30 },
        { type: "Final Exam", weightage: 30 },
      ],
    },
    {
      id: "crs_002",
      name: "Introduction to Computing",
      code: "CS-101",
      credits: 3,
      semester: 1,
      programId: "prog_001",
      teacherId: "tch_001",
      description: "Basic concepts of computing, computer systems, number systems, and introduction to programming.",
      prerequisites: [],
      learningOutcomes: [
        "Understand computer systems and architecture",
        "Learn number systems and data representation",
        "Introduction to programming concepts",
        "Basic problem-solving techniques",
      ],
      syllabus: [
        { week: 1, topic: "Introduction to Computers", hours: 3 },
        { week: 2, topic: "Computer Hardware and Software", hours: 3 },
        { week: 3, topic: "Number Systems", hours: 3 },
        { week: 4, topic: "Data Representation", hours: 3 },
        { week: 5, topic: "Introduction to Programming", hours: 3 },
        { week: 6, topic: "Problem Solving Techniques", hours: 3 },
        { week: 7, topic: "Algorithms and Flowcharts", hours: 3 },
        { week: 8, topic: "Programming Languages Overview", hours: 3 },
      ],
      assessmentCriteria: [
        { type: "Lab Work", weightage: 25 },
        { type: "Assignments", weightage: 15 },
        { type: "Quizzes", weightage: 20 },
        { type: "Mid-term Exam", weightage: 20 },
        { type: "Final Exam", weightage: 20 },
      ],
    },
    {
      id: "crs_003",
      name: "English Composition and Comprehension",
      code: "ENG-101",
      credits: 3,
      semester: 1,
      programId: "prog_001",
      teacherId: "tch_004",
      description: "Development of reading, writing, and communication skills in English.",
      prerequisites: [],
      learningOutcomes: [
        "Improve English writing skills",
        "Develop reading comprehension abilities",
        "Enhance communication skills",
        "Learn academic writing techniques",
      ],
      syllabus: [
        { week: 1, topic: "Parts of Speech and Grammar", hours: 3 },
        { week: 2, topic: "Sentence Structure", hours: 3 },
        { week: 3, topic: "Paragraph Writing", hours: 3 },
        { week: 4, topic: "Essay Writing", hours: 3 },
        { week: 5, topic: "Reading Comprehension", hours: 3 },
        { week: 6, topic: "Vocabulary Building", hours: 3 },
        { week: 7, topic: "Business Communication", hours: 3 },
        { week: 8, topic: "Presentation Skills", hours: 3 },
      ],
      assessmentCriteria: [
        { type: "Assignments", weightage: 30 },
        { type: "Presentations", weightage: 20 },
        { type: "Mid-term Exam", weightage: 25 },
        { type: "Final Exam", weightage: 25 },
      ],
    },
    // Semester 2 Courses
    {
      id: "crs_004",
      name: "Programming Fundamentals",
      code: "CS-201",
      credits: 4,
      semester: 2,
      programId: "prog_001",
      teacherId: "tch_001",
      description:
        "Introduction to programming using C++ language, covering basic programming constructs and problem-solving.",
      prerequisites: ["CS-101"],
      learningOutcomes: [
        "Learn C++ programming language",
        "Understand programming fundamentals",
        "Develop problem-solving skills",
        "Create basic programs and applications",
      ],
      syllabus: [
        { week: 1, topic: "Introduction to C++", hours: 4 },
        { week: 2, topic: "Variables and Data Types", hours: 4 },
        { week: 3, topic: "Control Structures", hours: 4 },
        { week: 4, topic: "Functions", hours: 4 },
        { week: 5, topic: "Arrays", hours: 4 },
        { week: 6, topic: "Pointers", hours: 4 },
        { week: 7, topic: "Structures", hours: 4 },
        { week: 8, topic: "File Handling", hours: 4 },
      ],
      assessmentCriteria: [
        { type: "Lab Work", weightage: 30 },
        { type: "Assignments", weightage: 20 },
        { type: "Quizzes", weightage: 15 },
        { type: "Mid-term Exam", weightage: 15 },
        { type: "Final Exam", weightage: 20 },
      ],
    },
    // Semester 3 Courses
    {
      id: "crs_005",
      name: "Data Structures and Algorithms",
      code: "CS-301",
      credits: 4,
      semester: 3,
      programId: "prog_001",
      teacherId: "tch_001",
      description:
        "Comprehensive study of data structures including arrays, linked lists, stacks, queues, trees, and graphs with algorithm analysis.",
      prerequisites: ["CS-201"],
      learningOutcomes: [
        "Understand fundamental data structures",
        "Analyze algorithm complexity",
        "Implement various data structures",
        "Choose appropriate data structures for problems",
      ],
      syllabus: [
        { week: 1, topic: "Introduction to Data Structures", hours: 4 },
        { week: 2, topic: "Arrays and Strings", hours: 4 },
        { week: 3, topic: "Linked Lists", hours: 4 },
        { week: 4, topic: "Stacks and Queues", hours: 4 },
        { week: 5, topic: "Trees", hours: 4 },
        { week: 6, topic: "Binary Search Trees", hours: 4 },
        { week: 7, topic: "Graphs", hours: 4 },
        { week: 8, topic: "Sorting and Searching", hours: 4 },
      ],
      assessmentCriteria: [
        { type: "Lab Work", weightage: 25 },
        { type: "Assignments", weightage: 25 },
        { type: "Quizzes", weightage: 15 },
        { type: "Mid-term Exam", weightage: 15 },
        { type: "Final Exam", weightage: 20 },
      ],
    },
    {
      id: "crs_006",
      name: "Object Oriented Programming",
      code: "CS-302",
      credits: 4,
      semester: 3,
      programId: "prog_001",
      teacherId: "tch_002",
      description:
        "Object-oriented programming concepts using Java including classes, objects, inheritance, polymorphism, and encapsulation.",
      prerequisites: ["CS-201"],
      learningOutcomes: [
        "Master OOP concepts and principles",
        "Learn Java programming language",
        "Design and implement object-oriented solutions",
        "Understand software design patterns",
      ],
      syllabus: [
        { week: 1, topic: "Introduction to OOP", hours: 4 },
        { week: 2, topic: "Classes and Objects", hours: 4 },
        { week: 3, topic: "Inheritance", hours: 4 },
        { week: 4, topic: "Polymorphism", hours: 4 },
        { week: 5, topic: "Encapsulation and Abstraction", hours: 4 },
        { week: 6, topic: "Exception Handling", hours: 4 },
        { week: 7, topic: "Collections Framework", hours: 4 },
        { week: 8, topic: "GUI Programming", hours: 4 },
      ],
      assessmentCriteria: [
        { type: "Lab Work", weightage: 30 },
        { type: "Projects", weightage: 25 },
        { type: "Quizzes", weightage: 15 },
        { type: "Mid-term Exam", weightage: 15 },
        { type: "Final Exam", weightage: 15 },
      ],
    },
  ] as Course[],

  // Enrollments data
  enrollments: [
    // Student 1 - Semester 1 (Completed)
    {
      id: "enr_001",
      studentId: "std_001",
      courseId: "crs_001",
      semester: 1,
      year: 2024,
      status: "completed" as const,
      grade: "A-",
      gradePoints: 3.7,
      percentage: 85,
      attendance: 92,
    },
    {
      id: "enr_002",
      studentId: "std_001",
      courseId: "crs_002",
      semester: 1,
      year: 2024,
      status: "completed" as const,
      grade: "A",
      gradePoints: 4.0,
      percentage: 88,
      attendance: 95,
    },
    {
      id: "enr_003",
      studentId: "std_001",
      courseId: "crs_003",
      semester: 1,
      year: 2024,
      status: "completed" as const,
      grade: "B+",
      gradePoints: 3.3,
      percentage: 78,
      attendance: 88,
    },
    // Student 1 - Semester 2 (Completed)
    {
      id: "enr_004",
      studentId: "std_001",
      courseId: "crs_004",
      semester: 2,
      year: 2024,
      status: "completed" as const,
      grade: "A",
      gradePoints: 4.0,
      percentage: 91,
      attendance: 94,
    },
    // Student 1 - Semester 3 (Current)
    {
      id: "enr_005",
      studentId: "std_001",
      courseId: "crs_005",
      semester: 3,
      year: 2024,
      status: "enrolled" as const,
      attendance: 85,
    },
    {
      id: "enr_006",
      studentId: "std_001",
      courseId: "crs_006",
      semester: 3,
      year: 2024,
      status: "enrolled" as const,
      attendance: 78,
    },
  ] as Enrollment[],

  // Assignments data
  assignments: [
    {
      id: "asn_001",
      courseId: "crs_005",
      title: "Array Implementation and Analysis",
      description:
        "Implement various array operations and analyze their time complexity. Include insertion, deletion, searching, and sorting operations.",
      type: "assignment" as const,
      totalMarks: 25,
      dueDate: "2024-12-15",
      instructions: "Submit your code with proper documentation and complexity analysis. Use C++ for implementation.",
      attachments: ["array_template.cpp", "requirements.pdf"],
      status: "published" as const,
    },
    {
      id: "asn_002",
      courseId: "crs_005",
      title: "Linked List Implementation",
      description: "Create a complete linked list implementation with all basic operations.",
      type: "assignment" as const,
      totalMarks: 30,
      dueDate: "2024-12-22",
      instructions: "Implement singly linked list with insert, delete, search, and display operations.",
      attachments: ["linkedlist_specs.pdf"],
      status: "published" as const,
    },
    {
      id: "asn_003",
      courseId: "crs_006",
      title: "Banking System using OOP",
      description: "Design and implement a banking system using object-oriented programming principles in Java.",
      type: "project" as const,
      totalMarks: 50,
      dueDate: "2024-12-28",
      instructions: "Create classes for Account, Customer, Bank with proper inheritance and encapsulation.",
      attachments: ["project_guidelines.pdf", "uml_template.png"],
      status: "published" as const,
    },
  ] as Assignment[],

  // Submissions data
  submissions: [
    {
      id: "sub_001",
      assignmentId: "asn_001",
      studentId: "std_001",
      submissionDate: "2024-12-14",
      content: "Array implementation completed with all required operations and complexity analysis.",
      attachments: ["array_implementation.cpp", "analysis_report.pdf"],
      marksObtained: 23,
      feedback: "Excellent work! Good implementation and clear analysis. Minor improvement needed in documentation.",
      status: "graded" as const,
    },
    {
      id: "sub_002",
      assignmentId: "asn_002",
      studentId: "std_001",
      submissionDate: "2024-12-21",
      content: "Complete linked list implementation with all operations.",
      attachments: ["linkedlist.cpp", "test_cases.cpp"],
      status: "submitted" as const,
    },
  ] as Submission[],

  // Lectures data
  lectures: [
    {
      id: "lec_001",
      courseId: "crs_005",
      title: "Introduction to Data Structures",
      description: "Overview of data structures, their importance, and classification.",
      week: 1,
      duration: 50,
      type: "video" as const,
      content: "https://example.com/lecture1.mp4",
      resources: [
        { title: "Lecture Slides", type: "PDF", url: "slides_week1.pdf", size: "2.5 MB" },
        { title: "Reading Material", type: "PDF", url: "chapter1.pdf", size: "5.2 MB" },
      ],
      completed: true,
    },
    {
      id: "lec_002",
      courseId: "crs_005",
      title: "Arrays and Dynamic Arrays",
      description: "Understanding arrays, memory allocation, and dynamic arrays.",
      week: 2,
      duration: 50,
      type: "video" as const,
      content: "https://example.com/lecture2.mp4",
      resources: [
        { title: "Lecture Slides", type: "PDF", url: "slides_week2.pdf", size: "3.1 MB" },
        { title: "Code Examples", type: "ZIP", url: "arrays_examples.zip", size: "1.8 MB" },
      ],
      completed: true,
    },
    {
      id: "lec_003",
      courseId: "crs_005",
      title: "Linked Lists - Part 1",
      description: "Introduction to linked lists, types, and basic operations.",
      week: 3,
      duration: 50,
      type: "video" as const,
      content: "https://example.com/lecture3.mp4",
      resources: [
        { title: "Lecture Slides", type: "PDF", url: "slides_week3.pdf", size: "2.8 MB" },
        { title: "Implementation Guide", type: "PDF", url: "linkedlist_guide.pdf", size: "4.2 MB" },
      ],
      completed: false,
    },
  ] as Lecture[],
}

// Database query functions
export class DatabaseService {
  static getStudentById(studentId: string): Student | undefined {
    return mockDatabase.students.find((s) => s.id === studentId)
  }

  static getStudentByRollNumber(rollNumber: string): Student | undefined {
    return mockDatabase.students.find((s) => s.rollNumber === rollNumber)
  }

  static getProgramById(programId: string): Program | undefined {
    return mockDatabase.programs.find((p) => p.id === programId)
  }

  static getCoursesByProgramAndSemester(programId: string, semester: number): Course[] {
    return mockDatabase.courses.filter((c) => c.programId === programId && c.semester === semester)
  }

  static getEnrollmentsByStudent(studentId: string): Enrollment[] {
    return mockDatabase.enrollments.filter((e) => e.studentId === studentId)
  }

  static getTeacherById(teacherId: string): Teacher | undefined {
    return mockDatabase.teachers.find((t) => t.id === teacherId)
  }

  static getCourseById(courseId: string): Course | undefined {
    return mockDatabase.courses.find((c) => c.id === courseId)
  }

  static getAssignmentsByCourse(courseId: string): Assignment[] {
    return mockDatabase.assignments.filter((a) => a.courseId === courseId)
  }

  static getSubmissionsByStudent(studentId: string): Submission[] {
    return mockDatabase.submissions.filter((s) => s.studentId === studentId)
  }

  static getLecturesByCourse(courseId: string): Lecture[] {
    return mockDatabase.lectures.filter((l) => l.courseId === courseId)
  }

  static getStudentAcademicRecord(studentId: string) {
    const student = this.getStudentById(studentId)
    if (!student) return null

    const program = this.getProgramById(student.programId)
    const enrollments = this.getEnrollmentsByStudent(studentId)

    const semesterData = []
    for (let sem = 1; sem <= (program?.duration || 8); sem++) {
      const semesterEnrollments = enrollments.filter((e) => e.semester === sem)
      const courses = semesterEnrollments.map((enrollment) => {
        const course = this.getCourseById(enrollment.courseId)
        const teacher = course ? this.getTeacherById(course.teacherId) : null
        return {
          ...course,
          ...enrollment,
          teacherName: teacher?.name,
        }
      })

      if (courses.length > 0) {
        const completedCourses = courses.filter((c) => c.status === "completed")
        const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0)
        const gpa =
          completedCourses.length > 0
            ? completedCourses.reduce((sum, c) => sum + (c.gradePoints || 0) * (c.credits || 0), 0) /
              completedCourses.reduce((sum, c) => sum + (c.credits || 0), 0)
            : 0

        semesterData.push({
          semester: sem,
          courses,
          gpa: Math.round(gpa * 100) / 100,
          credits: totalCredits,
          status: courses.some((c) => c.status === "enrolled")
            ? "current"
            : courses.every((c) => c.status === "completed")
              ? "completed"
              : "upcoming",
        })
      }
    }

    return {
      student,
      program,
      semesterData,
    }
  }

  // Bulk user operations
  static async bulkCreateUsers(users: BulkUser[]): Promise<{ success: number; failed: number; errors: string[] }> {
    let success = 0
    let failed = 0
    const errors: string[] = []

    for (const user of users) {
      try {
        if (user.role === "student") {
          const newStudent: Student = {
            id: `std_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            rollNumber: this.generateRollNumber(user.program || "BS-CS"),
            name: user.name,
            fatherName: user.fatherName || "",
            cnic: user.cnic || "",
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
            dateOfBirth: user.dateOfBirth || "",
            admissionDate: new Date().toISOString().split("T")[0],
            programId: this.getProgramIdByName(user.program || "BS Computer Science"),
            currentSemester: 1,
            status: "active",
            cgpa: 0,
            totalCredits: 0,
            completedCredits: 0,
          }
          mockDatabase.students.push(newStudent)
        } else if (user.role === "teacher") {
          const newTeacher: Teacher = {
            id: `tch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            employeeId: this.generateEmployeeId(user.department || "CS"),
            name: user.name,
            designation: user.designation || "Lecturer",
            department: user.department || "Computer Science",
            qualification: user.qualification || "",
            email: user.email,
            phone: user.phone || "",
            specialization: user.specialization ? user.specialization.split(",").map((s) => s.trim()) : [],
            experience: user.experience || 0,
          }
          mockDatabase.teachers.push(newTeacher)
        }
        success++
      } catch (error) {
        failed++
        errors.push(`Failed to create user ${user.name}: ${error}`)
      }
    }

    return { success, failed, errors }
  }

  static generateRollNumber(program: string): string {
    const year = new Date().getFullYear()
    const programCode = program.toUpperCase().replace(/\s+/g, "-")
    const sequence = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${programCode}-${year}-${sequence}`
  }

  static generateEmployeeId(department: string): string {
    const deptCode = department.toUpperCase().substring(0, 3)
    const sequence = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `GDSGC-${deptCode}-${sequence}`
  }

  static getProgramIdByName(programName: string): string {
    const program = mockDatabase.programs.find(
      (p) =>
        p.name.toLowerCase().includes(programName.toLowerCase()) ||
        programName.toLowerCase().includes(p.name.toLowerCase()),
    )
    return program?.id || "prog_001"
  }
}
