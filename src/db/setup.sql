DROP TABLE IF EXISTS public.levels CASCADE;

DROP TABLE IF EXISTS public.subjects CASCADE;

DROP TABLE IF EXISTS public.branches CASCADE;

DROP TABLE IF EXISTS public."profiles" CASCADE;

DROP TABLE IF EXISTS public.students CASCADE;

DROP TABLE IF EXISTS public."groups" CASCADE;

DROP TABLE IF EXISTS public.rooms CASCADE;

DROP TABLE IF EXISTS public.schedules CASCADE;

DROP TABLE IF EXISTS public.lessons CASCADE;

DROP TABLE IF EXISTS public.invoices CASCADE;

DROP TABLE IF EXISTS public."teacherSubjectMap" CASCADE;

DROP TABLE IF EXISTS public."userGroupMap" CASCADE;

DROP TYPE IF EXISTS user_role;

DROP TYPE IF EXISTS day_of_week;

-- SUBJECTS BEGIN
CREATE TABLE IF NOT EXISTS public.subjects (
    id INTEGER generated always as identity PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE
);

INSERT INTO
    public.subjects (name)
VALUES ('English'),
    ('Mathematics'),
    ('Physics'),
    ('Chemistry'),
    ('Biology');

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."subjects" FOR
SELECT to authenticated USING (true);

-- SUBJECTS END

-- LEVELS BEGIN
CREATE TABLE IF NOT EXISTS public.levels (
    id INTEGER generated always as identity PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO
    public.levels (name, price)
VALUES ('1', 0.00),
    ('2', 0.00),
    ('3', 0.00);

ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."levels" FOR
SELECT to authenticated USING (true);

-- LEVELS END

-- BRANCHES BEGIN
CREATE TABLE IF NOT EXISTS public.branches (
    id INTEGER generated always as identity PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    city VARCHAR(32) NOT NULL,
    region VARCHAR(32) NOT NULL,
    district VARCHAR(32) NOT NULL,
    address TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO
    public.branches (
        name,
        city,
        region,
        district,
        address
    )
VALUES (
        'Branch 1',
        'City 1',
        'Region 1',
        'District 1',
        'Address 1'
    );

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."branches" FOR
SELECT TO authenticated USING (true);

-- BRANCHES END

-- PROFILES BEGIN
CREATE TYPE user_role AS ENUM ('admin', 'teacher');

CREATE TABLE IF NOT EXISTS public."profiles" (
    id uuid PRIMARY KEY NOT NULL REFERENCES auth.users (id) DEFAULT auth.uid (),
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    role user_role NOT NULL,
    "firstName" VARCHAR(32) NOT NULL,
    "lastName" VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    photo TEXT NOT NULL,
    "branchId" INTEGER NOT NULL REFERENCES public.branches (id)
);

ALTER TABLE public."profiles" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all authenticated users to read own profiles" ON "public"."profiles" FOR ALL TO authenticated USING (
    (
        SELECT auth.uid ()
    ) = id
);

-- PROFILES END

-- STUDENTS BEGIN
CREATE TABLE IF NOT EXISTS public.students (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "firstName" VARCHAR(32) NOT NULL,
    "lastName" VARCHAR(32) NOT NULL,
    photo TEXT NOT NULL,
    "userId" UUID REFERENCES auth.users (id),
    "branchId" INTEGER NOT NULL REFERENCES public.branches (id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."students" FOR
SELECT TO authenticated USING (true);

-- STUDENTS END

-- GROUPS BEGIN
CREATE TABLE IF NOT EXISTS public."groups" (
    id INTEGER generated always as identity PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE,
    "subjectId" INTEGER NOT NULL REFERENCES public.subjects (id),
    "levelId" INTEGER NOT NULL REFERENCES public.levels (id),
    "branchId" INTEGER NOT NULL REFERENCES public.branches (id),
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO
    public."groups" (
        name,
        "subjectId",
        "levelId",
        "branchId"
    )
VALUES ('Group 1', 1, 1, 1);

ALTER TABLE public."groups" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."groups" FOR
SELECT TO authenticated USING (true);

-- GROUPS END

-- ROOMS BEGIN
CREATE TABLE IF NOT EXISTS public.rooms (
    id INTEGER generated always as identity PRIMARY KEY,
    name VARCHAR(32) NOT NULL UNIQUE,
    "branchId" INTEGER NOT NULL REFERENCES public.branches (id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.rooms (name, "branchId") VALUES ('Room 1', 1);

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."rooms" FOR
SELECT TO authenticated USING (true);

-- ROOMS END

-- SCHEDULES BEGIN
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

CREATE TABLE IF NOT EXISTS public.schedules (
    id INTEGER generated always as identity PRIMARY KEY,
    day day_of_week NOT NULL,
    "groupId" INTEGER NOT NULL REFERENCES public."groups" (id),
    "roomId" INTEGER NOT NULL REFERENCES public.rooms (id) ON DELETE CASCADE,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO
    public.schedules (
        day,
        "groupId",
        "roomId",
        "startTime",
        "endTime"
    )
VALUES (
        'monday',
        1,
        1,
        '08:00:00',
        '10:00:00'
    ),
    (
        'wednesday',
        1,
        1,
        '08:00:00',
        '10:00:00'
    ),
    (
        'friday',
        1,
        1,
        '08:00:00',
        '10:00:00'
    );

ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."schedules" FOR
SELECT TO authenticated USING (true);

-- SCHEDULES END

-- LESSONS BEGIN
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
    topic TEXT NOT NULL,
    "groupId" INTEGER NOT NULL REFERENCES public."groups" (id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."lessons" FOR
SELECT TO authenticated USING (true);

-- LESSONS END

-- INVOICES BEGIN
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid (),
    amount DECIMAL(10, 2) NOT NULL,
    discount INTEGER NOT NULL DEFAULT 0,
    "isAttended" BOOLEAN NOT NULL DEFAULT true,
    "lessonId" UUID NOT NULL REFERENCES public.lessons (id),
    "studentId" UUID NOT NULL REFERENCES public.students (id),
    "teacherId" UUID NOT NULL REFERENCES public."profiles" (id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all authenticated users" ON "public"."invoices" FOR
SELECT TO authenticated USING (true);

-- INVOICES END

-- teacherSubjectMap BEGIN
CREATE TABLE IF NOT EXISTS public."teacherSubjectMap" (
    "teacherId" uuid NOT NULL REFERENCES public."profiles" (id),
    "subjectId" INTEGER NOT NULL REFERENCES public.subjects (id),
    PRIMARY KEY ("teacherId", "subjectId")
);

ALTER TABLE public."teacherSubjectMap" ENABLE ROW LEVEL SECURITY;

-- teacherSubjectMap END

-- userGroupMap BEGIN
CREATE TABLE IF NOT EXISTS public."userGroupMap" (
    "teacherId" UUID REFERENCES public."profiles" (id),
    "studentId" UUID REFERENCES public.students (id),
    "groupId" INTEGER NOT NULL REFERENCES public."groups" (id),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (
        "teacherId",
        "studentId",
        "groupId"
    )
);

ALTER TABLE public."userGroupMap" ENABLE ROW LEVEL SECURITY;
-- userGroupMap END