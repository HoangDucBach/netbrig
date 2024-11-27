# NetBrig - Scholarship Platform for Students

## Table of Contents

- [NetBrig - Scholarship Platform for Students](#netbrig---scholarship-platform-for-students)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Why Request Network?](#why-request-network)
    - [Product Goal](#product-goal)
  - [User Stories](#user-stories)
  - [Problem Statement](#problem-statement)
    - [Complex and Time-Consuming Application Processes](#complex-and-time-consuming-application-processes)
    - [Lack of Transparency in Scholarship Distribution](#lack-of-transparency-in-scholarship-distribution)
    - [Difficulty in Discovering Relevant Scholarships](#difficulty-in-discovering-relevant-scholarships)
    - [Geographical and Currency Barriers](#geographical-and-currency-barriers)
    - [Lack of Automation in Payment and Disbursement](#lack-of-automation-in-payment-and-disbursement)
  - [NetBrig Solution](#netbrig-solution)
  - [Architecture Diagram](#architecture-diagram)
  - [Requirement Analysis](#requirement-analysis)

## Introduction

**NetBrig** is a decentralized platform designed to help students access scholarship opportunities from universities and companies. By leveraging cutting-edge technology, we aim to streamline the scholarship application and disbursement process, making it easier for students to receive financial support and for institutions to track and distribute scholarships efficiently.

### Why Request Network?

NetBrig utilizes Request Network as a core component to enhance the payment and disbursement processes for scholarships. Here’s why Request Network is the ideal choice:

**1. Transparency:**  
Request Network ensures that every financial transaction, including scholarship disbursements, is visible on the blockchain. This enhances trust between students, universities, and companies.

**2. Automation with Smart Contracts:**  
By integrating Request Network, NetBrig automates the creation and processing of payment requests. Once a scholarship is awarded, the payment request triggers the issuance of the NFT and transfers the funds seamlessly to the recipient.

**3. Cost-Effectiveness:**  
Request Network reduces transaction costs compared to traditional payment systems by leveraging blockchain technology, making it a financially efficient solution for managing multiple scholarships.

**4. Global Reach:**  
The decentralized nature of Request Network enables cross-border payments without the need for intermediaries, making NetBrig accessible to students, universities, and companies worldwide.

**5. Compliance and Security:**  
Request Network supports compliance with international standards for payments, ensuring that all financial operations on NetBrig are secure and adhere to legal regulations.

**6. Simplicity:**
Request Network simplifies blockchain interactions via APIs, removing the need for managing contracts, libraries, or gas.

**7. Privacy:**
Request Network ensures GDPR-compliant privacy, encrypting request data accessible only to involved parties on the blockchain.

### Product Goal

NetBrig aims to build a decentralized platform that connects students with scholarship opportunities from universities and companies. By leveraging blockchain technology and NFTs, we streamline the application process. Additionally, we use Request Network’s transparent payment protocol to automate the creation and disbursement of scholarships. The platform empowers talented students with easy access to financial aid and additional learning resources, while allowing universities and companies to distribute scholarships efficiently and measure their impact.

## User Stories

- **As a university**, I want to easily create and manage scholarship programs on the platform, including setting eligibility criteria, deadlines, and award amounts, and have easy access to talented students.
- **As a company**, I want to establish corporate scholarship programs to attract and retain top talent.
- **As a student**, I want to easily discover and apply for suitable scholarship opportunities through simple procedures.

## Problem Statement

### Complex and Time-Consuming Application Processes

Scholarship application procedures are often lengthy and complicated, requiring students to submit excessive paperwork and navigate multiple steps, leading to frustration and fewer applicants.

### Lack of Transparency in Scholarship Distribution

The scholarship disbursement process lacks clear tracking, making it difficult for students, universities, and companies to ensure fairness, accuracy, and accountability.

### Difficulty in Discovering Relevant Scholarships

Students face challenges in identifying suitable scholarships due to a lack of centralized information and personalized matching based on their qualifications, interests, and needs.

### Geographical and Currency Barriers

International scholarships face challenges like high transaction fees, slow payment processing, and issues with currency conversion, limiting access to global opportunities for students.

### Lack of Automation in Payment and Disbursement

Manual scholarship payment and disbursement processes are time-consuming, error-prone, and inefficient, delaying funds and adding administrative burden to universities and companies.

## NetBrig Solution

NetBrig addresses the challenges of the scholarship process by leveraging blockchain technologies along with Request Network’s efficient payment technology, ensuring a seamless and transparent experience for all users. Here’s how NetBrig addresses the identified issues:

**1. EIP-6551 for Scholarships and Learning Resources**
By utilizing **EIP-6551**, NetBrig links scholarships with educational materials via NFTs. These NFTs serve as both a proof of scholarship and a gateway to additional resources, such as learning materials, courses, or mentorship, enhancing the value students receive.

**2. ERC-4337 for Easy Web3 Access**
To simplify Web3 access, NetBrig integrates **ERC-4337,** making it easier for students to engage with the platform using smart accounts. This allows students to interact with Web3 features without the need for a cryptocurrency wallet, lowering the entry barrier and increasing accessibility.

**3. Request Network for Automatic Billing and Tracking**
NetBrig uses **Request Network** to automate the creation of invoices for scholarship disbursements and track payments on the blockchain. This ensures transparency, reduces manual processes, and allows universities and companies to monitor the scholarship flow in real-time, providing a seamless experience for all parties involved.

## Architecture Diagram

## Requirement Analysis

**1. Ease of Use**
The platform must be intuitive, enabling users (students, universities, companies) to easily navigate and manage scholarship processes.

**2. Blockchain Integration**
Utilize EIP6551 for NFT-based scholarships and Request Network for transparent payment automation, ensuring secure, efficient transactions.

**3. Global Access & Scalability**
Support for cross-border scholarship programs, multi-currency payments, and global accessibility to cater to international students and institutions.

**4. Automation & Smart Contracts**
Automate scholarship issuance, application processes, and payment disbursements through smart contracts to minimize manual effort.

**5. Transparency & Security**
Ensure transparency in scholarship distribution and secure data handling by leveraging blockchain and encryption technologies.

**6. Customization & Flexibility**
Allow universities and companies to customize scholarship programs with criteria, deadlines, and award amounts.

**7. Integration of Learning Materials**
Incorporate relevant learning resources, such as online courses or study materials, along with the scholarship, enhancing students' educational experience.

**8. Real-Time Tracking**
Provide real-time updates for scholarship status, application progress, and payment transactions.
