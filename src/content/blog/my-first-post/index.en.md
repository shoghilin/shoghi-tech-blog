---
title: "AWS EKS Cost Optimization: From Theory to CDK"
description: "Exploring ways to reduce EKS operational costs using Spot Instances."
pubDate: 2026-02-03
author: "Shoghi Lin"
tags: ["AWS", "EKS", "CDK"]
---

## Why Optimize EKS Costs?

While providing technical support for Dify, we often find that idle resources in K8s clusters are the primary source of waste.

$$
TotalCost = \sum_{i=1}^{n} (InstancePrice_i \times Time_i) + EBS + LoadBalancer
$$

Using AWS CDK, we can easily shift the Data Plane to Spot Instances.

### CDK Code snippet
```typescript
cluster.addAutoScalingGroupCapacity('SpotCapacity', {
  instanceType: new ec2.InstanceType('t3.medium'),
  spotPrice: '0.015',
  minCapacity: 1,
});